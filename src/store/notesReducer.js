const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTES_LOADING":
      return { ...state, loading: true, error: null };

    case "NOTES_SUCCESS":
      return { ...state, loading: false, notes: action.payload };

    case "NOTES_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};