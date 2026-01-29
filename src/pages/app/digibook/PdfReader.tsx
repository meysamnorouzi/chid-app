import { useState, useMemo, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker must be set in the same module where Document/Page are used (react-pdf requirement).
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/** Stable options for <Document /> to avoid unnecessary reloads (react-pdf warning). */
const DOCUMENT_OPTIONS = { disableRange: true };

/**
 * In-app PDF reader: renders PDF pages inside the app only. No download — user reads in place.
 */
interface PdfReaderProps {
  title: string;
  /** URL of the PDF (e.g. /pdf/Kmyk.pdf). */
  pdfUrl: string;
  onClose: () => void;
}

export default function PdfReader({ title, pdfUrl, onClose }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState(360);
  const [fileData, setFileData] = useState<{ data: Uint8Array } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch PDF as ArrayBuffer so Vite dev server returns 200 (avoids 204 on range/direct URL).
  useEffect(() => {
    const url = pdfUrl.startsWith("/")
      ? `${window.location.origin}${pdfUrl}`
      : pdfUrl;
    setFileData(null);
    setLoadError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.arrayBuffer();
      })
      .then((buf) => {
        if (buf.byteLength === 0) {
          setLoadError(
            "فایل PDF خالی است. لطفاً فایل Kmyk.pdf را در پوشه public/pdf قرار دهید و مطمئن شوید فایل دارای محتوا است."
          );
          return;
        }
        setFileData({ data: new Uint8Array(buf) });
      })
      .catch((err) => setLoadError(err?.message ?? "خطا در بارگذاری PDF"));
  }, [pdfUrl]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateWidth = () =>
      setPageWidth(Math.min(el.clientWidth - 16, 480));
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = ({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoadError(null);
  };

  const onLoadError = (error: Error) => {
    setLoadError(error?.message ?? "خطا در بارگذاری PDF");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" dir="rtl">
      {/* Header — no download, only close */}
      <div className="shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="بستن"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold truncate flex-1 text-center mx-2 text-gray-900">
          {title}
        </h1>
        <div className="w-10" />
      </div>

      {/* PDF content — rendered in-app only, scrollable; no download */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
      >
        {loadError ? (
          <div className="p-6 text-center text-red-600 text-sm">{loadError}</div>
        ) : !fileData ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            در حال بارگذاری…
          </div>
        ) : (
          <Document
            file={fileData}
            options={DOCUMENT_OPTIONS}
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            loading={
              <div className="flex items-center justify-center py-16 text-gray-500">
                در حال بارگذاری…
              </div>
            }
            error={
              <div className="p-6 text-center text-red-600 text-sm">
                بارگذاری PDF ممکن نشد.
              </div>
            }
            noData={
              <div className="p-6 text-center text-gray-500 text-sm">
                فایلی انتخاب نشده است.
              </div>
            }
            className="flex flex-col items-center w-full px-2 py-4"
          >
            {numPages != null &&
              Array.from({ length: numPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <div
                    key={pageNumber}
                    className="mb-4 w-full flex justify-center bg-white shadow-sm rounded-lg overflow-hidden"
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={pageWidth}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      loading={
                        <div className="min-h-[400px] flex items-center justify-center text-gray-400 text-sm">
                          صفحه {pageNumber}…
                        </div>
                      }
                    />
                  </div>
                )
              )}
          </Document>
        )}
      </div>
    </div>
  );
}
