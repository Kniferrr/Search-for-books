import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setError, setLoading } from "../store/reducers/searchResultsReducer";
import "./BookPage.scss";
import { Book } from "../types/types";
import { fetchBookById } from "../servises/Fetch/FetchBookData";

function BookPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dataBook, setDataBook] = useState<Book | null>(null);

  const loadBookData = async () => {
    try {
      if (id) {
        dispatch(setLoading(true));
        const data = await fetchBookById(id);
        setDataBook(data);
      } else {
        throw new Error("Book ID is not defined");
      }
    } catch (error) {
      const errorString = String(error);
      dispatch(setError(errorString));
    }
  };

  useEffect(() => {
    loadBookData();
  }, []);

  if (!dataBook) {
    return <div>Loading...</div>;
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

  return (
    <div className="book-page">
      <img src={thumbnail} alt={title} />
      <h1>{title}</h1>
      <p>Publication Date: {publishedDate}</p>
      <p>Publisher: {publisher}</p>
      <p>Number of Pages: {pageCount}</p>
      <p>Language: {language}</p>
      <p>Is Ebook: {isEbook ? "Yes" : "No"}</p>
      {categories && Array.isArray(categories) && categories.length > 0 && (
        <p>Categories: {`${categories}, `}</p>
      )}
      {authors && Array.isArray(authors) && authors.length > 0 && (
        <p>Authors: {`${authors}, `}</p>
      )}
      {description && <p>Description: {description}</p>}
    </div>
  );
}

export default BookPage;
