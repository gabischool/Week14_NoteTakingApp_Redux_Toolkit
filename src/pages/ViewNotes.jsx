import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import notesslice, {deleteNote} from "../store/slices/notesSlice";
import  addnote  from "../store/slices/notesSlice";
import { StickyNote, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchNotes } from "../store/slices/notesSlice";

const ViewNotes = () => {
 const dispatch = useDispatch();

  const { notes, status, error } = useSelector((state) => state.notes);
  console.log("NOTES", notes);


  useEffect(() => {
  const  loadNotes=async () => {
    if (status === "loading") return;
    try {
      await dispatch(fetchNotes()).unwrap();
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("Failed to load notes. Please try again.");
    }
  }
    loadNotes();
  }, [dispatch]);



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
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
