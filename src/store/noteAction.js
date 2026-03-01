import axios from "axios";

export const loadNotes = () => async (dispatch) => {
  dispatch({ type: "NOTES_LOADING" });

  try {
    const response = await axios.get("http://localhost:3001/api/notes");

    dispatch({
      type: "NOTES_SUCCESS",
      payload: response.data,
    });
  } catch (err) {
    console.error("Error fetching notes:", err);

    dispatch({
      type: "NOTES_ERROR",
      payload: "Failed to load notes. Please try again.",
    });
  }
};