import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import  {fetchNotes,DeleteNote,UpdateNote}  from "../store/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { StickyNote, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";



const ViewNotes = () => {
  const dispatch = useDispatch();

  

  const { notes, status, error } = useSelector((state) => state.note)
   console.log(notes)
  // const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const loadNotes = async () => {
    setLoading(true);
    try {
     
      await dispatch(fetchNotes()).unwrap();

    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };
    
  
  useEffect(() => {
    loadNotes();
    const handleNoteDelete = (NoteId) =>{
    dispatch (DeleteNote (NoteId));
  }

  }, []);
  
  //update note
  const handleNoteUpdate = (NoteId) => {
    dispatch(UpdateNote(NoteId)); 
  }       
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/notes/${id}`);
      const noteData = response.data;
      const updatedNote = {
        ...noteData,
        title: "Updated Title",
        content: "Updated Content",
      };
      await dispatch(UpdateNote({ id, updatedData: updatedNote }));
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note. Please try again.");
    }      
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
     await dispatch(DeleteNote(id))
      
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note. Please try again.");
      
    }
  };

   
  

   
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-yellow-500">
          <StickyNote size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadNotes}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-yellow-400">
          <StickyNote size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Notes Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first note to get started
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Create a Note
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Notes</h1>
        <p className="text-gray-600">
          {notes.length} {notes.length === 1 ? "note" : "notes"} stored
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} 
          onUpdate={handleUpdate}     
          
          
          />

        ))}
      </div>
    </div>
  );
};

export default ViewNotes;