import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setError, setLoading } from "../store/reducers/searchResultsReducer";
import { fetchBookById } from "../servises/Fetch/FetchBookData";
import "./BookPage.scss";
import { Book } from "../types/types";

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
        throw new Error("ID книги не определен");
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
      <p>Дата публикации: {publishedDate}</p>
      <p>Издатель: {publisher}</p>
      <p>Количество страниц: {pageCount}</p>
      <p>Язык: {language}</p>
      <p>Электронная книга: {isEbook ? "Да" : "Нет"}</p>
      {categories && Array.isArray(categories) && categories.length > 0 && (
        <p>Категории: {`${categories}, `}</p>
      )}
      {authors && Array.isArray(authors) && authors.length > 0 && (
        <p>Авторы: {`${authors}, `}</p>
      )}
      {description && <p>Описание: {description}</p>}
    </div>
  );
}

export default BookPage;
