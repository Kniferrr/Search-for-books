import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, SearchResultsData } from "../../types/types";

interface SearchResultsState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  totalItems: number;
  SearchValue: string;
  page: number;
  sorting: string;
  category: string;
}

const initialState: SearchResultsState = {
  books: [],
  isLoading: false,
  error: null,
  totalItems: 0,
  SearchValue: "",
  page: 1,
  sorting: "newest",
  category: "all",
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResultsData>) => {
      console.log(action);
      state.books = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.isLoading = false;
      state.error = null;
      state.page = 1;
    },
    AddSearchResults: (state, action: PayloadAction<SearchResultsData>) => {
      state.books = [...state.books, ...action.payload.items];
      state.isLoading = false;
      state.error = null;
      state.page++;
      state.totalItems = action.payload.totalItems;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.SearchValue = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const {
  setSearchResults,
  setLoading,
  setError,
  setSearchValue,
  AddSearchResults,
  setSorting,
  setCategory,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
