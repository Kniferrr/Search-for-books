// BookCard.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BookCard from "./BookCard/BookCard";
import {
  AddSearchResults,
  setError,
  setLoading,
} from "../../store/reducers/searchResultsReducer";
import { fetchBooks } from "../../servises/Fetch/FetchBookData";
import "./BookList.scss";

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector(
    (state: RootState) => state.searchResultsSlice.books
  );
  const totalItems = useSelector(
    (state: RootState) => state.searchResultsSlice.totalItems
  );
  const SearchValue = useSelector(
    (state: RootState) => state.searchResultsSlice.SearchValue
  );
  const page = useSelector((state: RootState) => state.searchResultsSlice.page);

  const onSearchMore = async () => {
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

  if (books == undefined) {
    return <div>NaN</div>;
  }

  return (
    <>
      <div className="Book-list">
        {books.map((book) => {
          const title = book.volumeInfo.title || "No title available";
          const category =
            book.volumeInfo.categories && book.volumeInfo.categories.length > 0
              ? book.volumeInfo.categories[0]
              : "No category available";
          const authors =
            book.volumeInfo.authors && book.volumeInfo.authors.length > 0
              ? book.volumeInfo.authors
              : ["Nan"];
          const image =
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : "No image available";
          const id = book.id;

          return (
            <BookCard
              title={title}
              category={category}
              authors={authors}
              image={image}
              id={id}
              key={book.etag}
            />
          );
        })}
      </div>
      {books !== undefined && books.length > 0 && totalItems - 30 * page > 0 ? (
        <button onClick={onSearchMore}>Load More</button>
      ) : (
        <></>
      )}
    </>
  );
};

export default BookList;
