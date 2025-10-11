import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNote } from "../store/slices/noteSlice";

import { StickyNote, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
const ViewNotes = () => {
 const dispatch = useDispatch()

 const { notes, error } = useSelector((state) => state.notes)
 console.log(notes)


  useEffect(() => {
    dispatch(fetchNote());
  }, []);

  


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
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
