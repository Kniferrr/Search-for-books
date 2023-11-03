import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./BookPage.scss";
import { Book } from "../../types/types";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ImgComponent from "../ImgComponent/ImgComponent";
import { loadBookData } from "../../helpers/SearchHelper";

function BookPage() {
  const dispatch = useDispatch();
  const { id = "1" } = useParams();
  const [dataBook, setDataBook] = useState<Book | null>(null);

  useEffect(() => {
    loadBookData(dispatch, id, setDataBook);
  }, []);

  if (!dataBook) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  const {
    volumeInfo: {
      title,
      publishedDate,
      publisher,
      pageCount,
      language,
      imageLinks: { thumbnail },
    },
    saleInfo: { isEbook },
    volumeInfo: { categories, authors, description },
  } = dataBook;
  console.log(dataBook);
  return (
    <div className="book-page">
      <div className="book-page-img-container">
        <div className="book-page-img">
          <ImgComponent image={thumbnail} />
        </div>
      </div>
      <h1>{title}</h1>
      <p>Publication Date: {publishedDate}</p>
      <p>Publisher: {publisher}</p>
      <p>Number of Pages: {pageCount}</p>
      <p>Language: {language}</p>
      <p>Electronic Book: {isEbook ? "Yes" : "No"}</p>
      {categories && Array.isArray(categories) && categories.length > 0 && (
        <p>Categories: {`${categories}, `}</p>
      )}
      {authors && Array.isArray(authors) && authors.length > 0 && (
        <p>Authors: {`${authors}, `}</p>
      )}
      {description && (
        <p>Description: {description.replace(/<[^>]*>?/g, "")}</p>
      )}
    </div>
  );
}

export default BookPage;
