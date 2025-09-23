import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../store/slices/notesSlice';

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector(state => state.notes);

  useEffect(() => { dispatch(fetchNotes()); }, [dispatch]);

  if (loading) return <p className="text-blue-500 text-center mt-6">Loading notes...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>;
  if (notes.length === 0) return <p className="text-gray-500 text-center mt-6">No notes available.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {notes.map(note => (
        <div key={note.id} className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
