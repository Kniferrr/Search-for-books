import React from "react";
import ImgComponent from "./ImgComponent";
import "./BookCard.scss";

interface BookCardProps {
  title: string;
  category: string;
  authors: string[];
  image: string;
  id: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  category,
  authors,
  image,
  id,
}) => (
  <div className="book-card">
    <a href={`#/book/${id}`}>
      <ImgComponent image={image} />
      <h2>{title}</h2>
      <p>{category}</p>
      <p>Авторы: {authors.join(", ")}</p>
    </a>
  </div>
);

export default BookCard;
