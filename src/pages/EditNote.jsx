// ✅ pages/EditNote.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditNoteForm from "../components/EditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  const note = useSelector((state) =>
    state.notes.notes.find((n) => n.id.toString() === id)
  );

  if (!note) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-red-500 mb-4">Note not found</h2>
        <p className="text-gray-600">Check the URL or return to your notes.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditNoteForm existingNote={note} />
    </div>
  );
};

export default EditNote;
