// BookCard.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BookCard from "./BookCard/BookCard";
import "./BookList.scss";
import { onSearchMore } from "../../helpers/SearchHelper";

const BookList: React.FC = () => {
  const dispatch = useDispatch();

  const { books, totalItems, SearchValue, page } = useSelector(
    (state: RootState) => state.mainReducer
  );

  if (books == undefined) {
    return <div>Nothing found</div>;
  }

  return (
    <>
      <div className="Book-list">
        {books.map((book) => {
          return <BookCard book={book} key={book.etag} />;
        })}
      </div>
      {books !== undefined && books.length > 0 && totalItems - 30 * page > 0 ? (
        <button onClick={() => onSearchMore(dispatch, SearchValue, page)}>
          Load More
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default BookList;
