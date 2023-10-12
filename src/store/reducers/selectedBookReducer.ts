import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/types";

interface SelectedBookState {
  book: Book | null;
}

const initialState: SelectedBookState = {
  book: null,
};

const selectedBookSlice = createSlice({
  name: "selectedBook",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    clearSelectedBook: (state) => {
      state.book = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = selectedBookSlice.actions;

export default selectedBookSlice.reducer;
