import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [
      { id: "1", name: "Work" },
      { id: "2", name: "Personal" },
      { id: "3", name: "Ideas" },
    ],
  },
  reducers: {
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
