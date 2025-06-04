// ✅ NoteCard.jsx
import { Trash2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const NoteCard = ({ note, onDelete }) => {
  const { id, title, content } = note;

  return (
    <div
      className="relative"
      style={{
        filter: "drop-shadow(0 2px 4px #b266ff)",
        borderRadius: "6px",
      }}
    >
      <div
        className="p-6"
        style={{
          background: "#d9ff3e",
          color: "#111",
          borderRadius: "6px",
          minHeight: "180px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          fontFamily: "inherit",
          display: "flex",
          flexDirection: "column",
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 23px, #c7e97b 24px)",
          backgroundSize: "100% 24px",
        }}
      >
        {/* 🖊️ Edit & 🗑 Delete Buttons */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-light mb-2" style={{ fontWeight: 400 }}>
            {title}
          </h3>
          <div className="flex gap-2">
            <Link
              to={`/edit/${id}`}
              aria-label="Edit note"
              className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              <Pencil size={18} />
            </Link>
            <button
              onClick={() => onDelete(id)}
              aria-label="Delete note"
              className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* 📝 Note Content */}
        <div className="flex-grow mb-2">
          <p
            className="text-base whitespace-pre-line"
            style={{ fontWeight: 300 }}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
