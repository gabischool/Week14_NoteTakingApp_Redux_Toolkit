import { Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../store/slice/slice";

const NoteCard = ({ note, onDelete }) => {
  const { id, title, content } = note;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (editTitle.trim() === "" || editContent.trim() === "") {
      alert("Title and content cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      await dispatch(updateNote({ 
        id, 
        noteData: { title: editTitle.trim(), content: editContent.trim() } 
      })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Failed to update note. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditContent(content);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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
        <div className="flex justify-between items-start mb-3">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-2xl font-light mb-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-800"
              style={{ fontWeight: 400 }}
            />
          ) : (
            <h3 className="text-2xl font-light mb-2" style={{ fontWeight: 400 }}>
              {title}
            </h3>
          )}
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  aria-label="Save changes"
                  className="text-gray-500 hover:text-green-500 p-1 rounded-full hover:bg-green-50 transition-colors disabled:opacity-50"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  aria-label="Cancel editing"
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  aria-label="Edit note"
                  className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(id)}
                  aria-label="Delete note"
                  className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex-grow mb-2">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-base"
              style={{ fontWeight: 300 }}
              rows={6}
            />
          ) : (
            <p
              className="text-base whitespace-pre-line"
              style={{ fontWeight: 300 }}
            >
              {content}
            </p>
          )}
        </div>
        {isUpdating && (
          <div className="text-sm text-gray-600 mt-2">Updating...</div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
