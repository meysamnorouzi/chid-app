import { useMemo, useRef, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Friends = () => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  const friends = useMemo(
    () => [
      { id: 1, name: "آرین", color: "from-pink-400 to-pink-600", size: 120, isChild: true },
      { id: 2, name: "نیلوفر", color: "from-sky-400 to-sky-600", size: 96, isChild: true },
      { id: 3, name: "مهسا", color: "from-emerald-400 to-emerald-600", size: 88, isChild: false },
      { id: 4, name: "پارسا", color: "from-amber-400 to-amber-600", size: 84, isChild: true },
      { id: 5, name: "آوا", color: "from-purple-400 to-purple-600", size: 110, isChild: true },
      { id: 6, name: "هلیا", color: "from-rose-400 to-rose-600", size: 76, isChild: true },
      { id: 7, name: "امیرعلی", color: "from-indigo-400 to-indigo-600", size: 92, isChild: true },
      { id: 8, name: "نورا", color: "from-teal-400 to-teal-600", size: 78, isChild: false },
      { id: 9, name: "بردیا", color: "from-orange-400 to-orange-600", size: 102, isChild: true },
      { id: 10, name: "النا", color: "from-cyan-400 to-cyan-600", size: 86, isChild: true },
      { id: 11, name: "کیان", color: "from-lime-400 to-lime-600", size: 72, isChild: true },
      { id: 12, name: "رها", color: "from-fuchsia-400 to-fuchsia-600", size: 98, isChild: true },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState<number>(friends[0]?.id ?? 1);

  const orbitLayout = useMemo(() => {
    const spacingX = 118;
    const spacingY = 102;
    const cells = [
      { col: -1, row: -1 },
      { col: 1, row: -1 },
      { col: -2, row: 0 },
      { col: 2, row: 0 },
      { col: -1, row: 1 },
      { col: 1, row: 1 },
      { col: 0, row: -2 },
      { col: 0, row: 2 },
      { col: -2, row: -1 },
      { col: 2, row: 1 },
      { col: -3, row: 1 },
      { col: 3, row: -1 },
      { col: 0, row: 3 },
    ];

    return cells.map((cell) => {
      const x = cell.col * spacingX + (cell.row % 2) * (spacingX / 2);
      const y = cell.row * spacingY;
      return { x, y };
    });
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const next = clamp(scale - event.deltaY * 0.001, 0.6, 2.2);
    setScale(next);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!lastPointerRef.current) return;
    const dx = event.clientX - lastPointerRef.current.x;
    const dy = event.clientY - lastPointerRef.current.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = () => {
    lastPointerRef.current = null;
  };

  const selectedFriend = friends.find((friend) => friend.id === selectedId) ?? friends[0];
  const orderedFriends = selectedFriend
    ? [selectedFriend, ...friends.filter((friend) => friend.id !== selectedFriend.id)]
    : [...friends];

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <div className="bg-white min-h-screen px-4 py-6 max-w-4xl mx-auto">
        <div className="relative flex h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-white via-gray-50 to-white shadow-sm">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(15,23,42,0.06), transparent 65%)",
            }}
          />
          <div
            className="relative h-full w-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              }}
            >
              {orderedFriends.map((friend, index) => {
                const isMain = friend.id === selectedId;
                const position = isMain ? { x: 0, y: 0 } : orbitLayout[index - 1];
                const size = isMain ? 170 : friend.size;

                return (
                  <button
                    key={friend.id}
                    type="button"
                    onClick={() => setSelectedId(friend.id)}
                    className="absolute"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      zIndex: isMain ? 10 : 1,
                    }}
                  >
                    <div
                      className={`relative flex flex-col items-center justify-center rounded-full bg-gradient-to-br ${friend.color} shadow-[0_10px_25px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:scale-105`}
                      style={{ width: size, height: size }}
                    >
                      {friend.isChild && (
                        <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow">
                          <UserIcon className="h-4 w-4" />
                        </span>
                      )}
                      <span className="text-base font-semibold text-white drop-shadow">
                        {friend.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
