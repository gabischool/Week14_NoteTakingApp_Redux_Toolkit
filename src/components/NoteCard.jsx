import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../store/slices/notesSlice";
import NoteCard from "./NoteCard";

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, isDeleting, error } = useSelector((state) => state.notes);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={handleDelete} />
      ))}
      {isDeleting && <p>Deleting note...</p>}
    </div>
  );
};

export default NotesList;
