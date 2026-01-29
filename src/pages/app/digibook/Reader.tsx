import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "./data";
import TextReader from "./TextReader";
import ImageReader from "./ImageReader";
import PdfReader from "./PdfReader";

export default function Reader() {
  const { bookId, partId } = useParams<{ bookId: string; partId: string }>();
  const navigate = useNavigate();

  const book = bookId ? getBookById(bookId) : null;
  const part = book?.parts.find((p) => p.id === partId) ?? null;

  const handleClose = () => {
    navigate(`/digibook/${bookId}`);
  };

  if (!book || !part) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4" dir="rtl">
        <div className="text-center">
          <p className="text-gray-500 mb-4">پارت یافت نشد.</p>
          <button
            type="button"
            onClick={() => navigate(bookId ? `/digibook/${bookId}` : "/digibook")}
            className="text-[#7e4bd0] font-semibold"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  if (part.type === "text") {
    const paragraphs = Array.isArray(part.content) ? part.content : [part.content];
    return (
      <TextReader
        title={part.title}
        paragraphs={paragraphs}
        onClose={handleClose}
      />
    );
  }

  if (part.type === "pdf") {
    const pdfUrl = typeof part.content === "string" ? part.content : part.content[0] ?? "";
    return (
      <PdfReader
        title={part.title}
        pdfUrl={pdfUrl}
        onClose={handleClose}
      />
    );
  }

  const imageUrls = Array.isArray(part.content) ? part.content : [part.content];
  return (
    <ImageReader
      title={part.title}
      imageUrls={imageUrls}
      onClose={handleClose}
    />
  );
}
