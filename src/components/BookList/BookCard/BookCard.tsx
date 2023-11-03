// BookCard.tsx
import React from "react";
import "./BookCard.scss";
import ImgComponent from "../../ImgComponent/ImgComponent";
import { Book } from "../../../types/types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
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
    <div className="book-card">
      <a href={`#/book/${id}`}>
        <div className="book-card-img-container">
          <div className="book-card-img">
            <ImgComponent image={image} />
          </div>
        </div>
        <h2>{title}</h2>
        <p>{category}</p>
        <p>Author: {authors.join(", ")}</p>
      </a>
    </div>
  );
};

export default BookCard;
