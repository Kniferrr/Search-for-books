import { fetchBookById, fetchBooks } from "../servises/Fetch/FetchBookData";
import {
  AddSearchResults,
  setError,
  setLoading,
  setSearchResults,
} from "../store/reducers/mainReducer";
import { Book, SearchResultsData } from "../types/types";

type MyAction = {
  type: string;
  payload: boolean | SearchResultsData | string;
};

export const onSearch = async (
  dispatch: (action: MyAction) => void,
  navigate: (path: string) => void,
  SearchValue: string,
  sorting: string,
  category: string
) => {
  if (SearchValue !== "") {
    try {
      dispatch(setLoading(true));
      const data = await fetchBooks(1, SearchValue, sorting, category);
      if (data !== undefined) dispatch(setSearchResults(data));
      navigate("/");
    } catch (error) {
      const errorString = String(error);
      dispatch(setError(errorString));
    }
  }
};

type LoadBookDataFunction = (
  dispatch: (action: MyAction) => void,
  id: string,
  setDataBook: React.Dispatch<React.SetStateAction<Book | null>>
) => void;

export const loadBookData: LoadBookDataFunction = async (
  dispatch,
  id,
  setDataBook
) => {
  try {
    if (id) {
      dispatch(setLoading(true));
      const data = await fetchBookById(id);
      setDataBook(data);
    } else {
      throw new Error("ID книги не определен");
    }
  } catch (error) {
    const errorString = String(error);
    dispatch(setError(errorString));
  }
};

type onSearchMoreDataFunction = (
  dispatch: (action: MyAction) => void,
  SearchValue: string,
  page: number
) => void;

export const onSearchMore: onSearchMoreDataFunction = async (
  dispatch,
  SearchValue,
  page
) => {
  if (SearchValue !== "") {
    try {
      dispatch(setLoading(true));
      const data = await fetchBooks(page + 1, SearchValue);
      console.log(data, page, SearchValue);
      if (data !== undefined) dispatch(AddSearchResults(data));
    } catch (error) {
      const errorString = String(error);
      dispatch(setError(errorString));
    }
  }
};
