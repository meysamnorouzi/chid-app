import { ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * ریدر PDF: نمایش فایل PDF (مثلاً Kmyk.pdf) در iframe برای خواندن در دیجی‌بوک.
 */
interface PdfReaderProps {
  title: string;
  /** URL of the PDF (e.g. /pdf/Kmyk.pdf). */
  pdfUrl: string;
  onClose: () => void;
}

export default function PdfReader({ title, pdfUrl, onClose }: PdfReaderProps) {
  const resolvedUrl = pdfUrl.startsWith("/") ? `${window.location.origin}${pdfUrl}` : pdfUrl;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" dir="rtl">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="بستن"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold truncate flex-1 text-center mx-2 text-gray-900">{title}</h1>
        <div className="w-10" />
      </div>

      {/* PDF viewer: full area, no extra margins so PDF uses full width */}
      <div className="flex-1 min-h-0 w-full overflow-hidden bg-gray-200">
        <iframe
          title={title}
          src={`${resolvedUrl}#view=FitH&toolbar=1`}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
