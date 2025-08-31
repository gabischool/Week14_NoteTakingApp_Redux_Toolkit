import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { noteSchema } from "../schema/notes";
import { addNote } from "../store/slices/notesSlice";

const CreateNoteForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.notes);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const sendToTheServer = async (data) => {
    try {
      const result = await dispatch(addNote(data));
      // Briefly show success state

      if (addNote.fulfilled.match(result)) {
        reset();
        setTimeout(() => {
          navigate("/notes");
        }, 500);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      alert("Failed to create note. Please try again.");
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto"
      onSubmit={handleSubmit(sendToTheServer)}
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Create a New Note
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Note Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Write your note here..."
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <Save size={18} />
        <span>{loading ? "Saving..." : "Save Note"}</span>
      </button>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default CreateNoteForm;
