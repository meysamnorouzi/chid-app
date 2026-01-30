import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export type HotspotRect = {
  id: string;
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  path: string;
};

export type HotspotCircle = {
  id: string;
  type: "circle";
  cx: number;
  cy: number;
  r: number;
  path: string;
};

export type Hotspot = HotspotRect | HotspotCircle;

const MAP_VIEWBOX = { width: 1576, height: 903 };
// Do not allow zooming out smaller than the initial fit (scale 1)
const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
const ZOOM_SENSITIVITY = 0.002;

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { id: "shop", type: "rect", x: 700, y: 400, width: 120, height: 80, path: "/shop" },
  { id: "wallet", type: "circle", cx: 400, cy: 450, r: 60, path: "/wallet-money" },
];

function parseMapInner(svgText: string): string {
  const openTagEnd = svgText.indexOf(">", svgText.indexOf("<svg"));
  const closeTagStart = svgText.lastIndexOf("</svg>");
  if (openTagEnd === -1 || closeTagStart === -1 || closeTagStart <= openTagEnd) return "";
  return svgText.slice(openTagEnd + 1, closeTagStart).trim();
}

function screenToViewBox(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
  return { x: svgP.x, y: svgP.y };
}

/** Bounds in viewBox/content coordinates. Clicks outside this (e.g. clouds at edges) do not navigate. */
export type ClickableBounds = { x: number; y: number; width: number; height: number };

export function InteractiveMap({
  hotspots = DEFAULT_HOTSPOTS,
  onHotspotClick,
  clickableBounds,
}: {
  hotspots?: Hotspot[];
  onHotspotClick?: (hotspot: { id: string; path: string }) => void;
  /** Optional: only navigate when click is inside this rect (e.g. central town; edges = clouds = no click). */
  clickableBounds?: ClickableBounds;
}) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapInner, setMapInner] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const pinchStart = useRef<{ distance: number; center: { x: number; y: number }; scale: number; x: number; y: number } | null>(null);
  const transformRef = useRef(transform);
  const mouseDownRef = useRef<{ x: number; y: number } | null>(null);
  const hasPannedRef = useRef(false);

  transformRef.current = transform;

  useEffect(() => {
    let cancelled = false;
    fetch("/svg/map.svg")
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        setMapInner(parseMapInner(text));
        setLoadError(null);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err?.message ?? "Failed to load map");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      mouseDownRef.current = { x: e.clientX, y: e.clientY };
      hasPannedRef.current = false;
      setIsPanning(true);
      panStart.current = { x: transform.x, y: transform.y, startX: e.clientX, startY: e.clientY };
    },
    [transform]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!panStart.current || !svgRef.current) return;
      const dx = e.clientX - panStart.current.startX;
      const dy = e.clientY - panStart.current.startY;
      if (Math.hypot(dx, dy) > 8) hasPannedRef.current = true;
      const ctm = svgRef.current.getScreenCTM();
      if (!ctm) return;
      setTransform({
        ...transform,
        x: panStart.current.x + dx / ctm.a,
        y: panStart.current.y + dy / ctm.d,
      });
    },
    [transform]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      const start = mouseDownRef.current;
      mouseDownRef.current = null;
      if (start && !hasPannedRef.current && svgRef.current) {
        const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
        if (dist <= 10) {
          const pt = screenToViewBox(svgRef.current, e.clientX, e.clientY);
          const { x, y, scale } = transformRef.current;
          const cx = (pt.x - x) / scale;
          const cy = (pt.y - y) / scale;
          const insideCentral =
            !clickableBounds ||
            (cx >= clickableBounds.x &&
              cx <= clickableBounds.x + clickableBounds.width &&
              cy >= clickableBounds.y &&
              cy <= clickableBounds.y + clickableBounds.height);
          if (!insideCentral) {
            panStart.current = null;
            setIsPanning(false);
            return;
          }
          const hit = hotspots.find((h) => {
            if (h.type === "rect") {
              return cx >= h.x && cx <= h.x + h.width && cy >= h.y && cy <= h.y + h.height;
            }
            const dx = cx - h.cx;
            const dy = cy - h.cy;
            return dx * dx + dy * dy <= h.r * h.r;
          });
          if (hit) {
            if (onHotspotClick) onHotspotClick({ id: hit.id, path: hit.path });
            else navigate(hit.path);
          }
        }
      }
      panStart.current = null;
      setIsPanning(false);
    },
    [hotspots, navigate, onHotspotClick, clickableBounds]
  );

  const handleMouseLeave = useCallback(() => {
    panStart.current = null;
    setIsPanning(false);
  }, []);

  const getTouchCenter = (touches: { clientX: number; clientY: number }[]) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });
  const getTouchDistance = (touches: { clientX: number; clientY: number }[]) =>
    Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const svg = svgRef.current;
        if (!svg) return;
        const touches = Array.from(e.touches) as { clientX: number; clientY: number }[];
        const center = getTouchCenter(touches);
        const vb = screenToViewBox(svg, center.x, center.y);
        pinchStart.current = {
          distance: getTouchDistance(touches),
          center: vb,
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        };
      } else if (e.touches.length === 1) {
        setIsPanning(true);
        panStart.current = {
          x: transform.x,
          y: transform.y,
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
        };
      }
    },
    [transform]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && pinchStart.current && svgRef.current) {
        e.preventDefault();
        const dist = getTouchDistance(Array.from(e.touches) as { clientX: number; clientY: number }[]);
        const ratio = dist / pinchStart.current.distance;
        const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchStart.current.scale * ratio));
        const { center, x, y } = pinchStart.current;
        const newX = x + (center.x - x) * (1 - newScale / pinchStart.current.scale);
        const newY = y + (center.y - y) * (1 - newScale / pinchStart.current.scale);
        setTransform({ x: newX, y: newY, scale: newScale });
      } else if (e.touches.length === 1 && panStart.current && svgRef.current) {
        const ctm = svgRef.current.getScreenCTM();
        if (!ctm) return;
        const dx = e.touches[0].clientX - panStart.current.startX;
        const dy = e.touches[0].clientY - panStart.current.startY;
        setTransform({
          ...transform,
          x: panStart.current.x + dx / ctm.a,
          y: panStart.current.y + dy / ctm.d,
        });
      }
    },
    [transform]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchStart.current = null;
    if (e.touches.length < 1) {
      panStart.current = null;
      setIsPanning(false);
    }
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el || !mapInner) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = 1 - e.deltaY * ZOOM_SENSITIVITY;
      const { x, y, scale } = transformRef.current;
      const pt = screenToViewBox(el, e.clientX, e.clientY);
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale * delta));
      const newX = x + (pt.x - x) * (1 - newScale / scale);
      const newY = y + (pt.y - y) * (1 - newScale / scale);
      setTransform({ x: newX, y: newY, scale: newScale });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mapInner]);

  useEffect(() => {
    const onUp = () => {
      panStart.current = null;
      setIsPanning(false);
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const { x, y, scale } = transform;
  const viewportTransform = `translate(${x},${y}) scale(${scale})`;

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
        {loadError}
      </div>
    );
  }

  if (!mapInner) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
        در حال بارگزاری
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className="block touch-none"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <g transform={viewportTransform} style={{ transformOrigin: "0 0" }}>
          <g dangerouslySetInnerHTML={{ __html: mapInner }} />
          <g className="map-hotspots" style={{ pointerEvents: "all" }}>
            {hotspots.map((h) =>
              h.type === "rect" ? (
                <rect
                  key={h.id}
                  x={h.x}
                  y={h.y}
                  width={h.width}
                  height={h.height}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <circle
                  key={h.id}
                  cx={h.cx}
                  cy={h.cy}
                  r={h.r}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                />
              )
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
