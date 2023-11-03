// BookCard.tsx
import React from "react";
import "./BookCard.scss";
import ImgComponent from "../../ImgComponent/ImgComponent";

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
      <div className="book-card-img-container">
        <div className="book-card-img">
          <ImgComponent image={image} />
        </div>
      </div>

      <h2>{title}</h2>
      <p>{category}</p>
      <p>Авторы: {authors.join(", ")}</p>
    </a>
  </div>
);

export default BookCard;
