import { render } from "@testing-library/react";
import BookCard from "../components/BookCard";

const bookData = {
  title: "Пример книги",
  category: "Пример категории",
  authors: ["Автор 1", "Автор 2"],
  image: "путь-к-изображению.jpg",
  id: "123",
};

test("отображает правильные данные в компоненте BookCard", () => {
  const { getByText, getByAltText, queryByText } = render(
    <BookCard
      title={bookData.title}
      category={bookData.category}
      authors={bookData.authors}
      image={bookData.image}
      id={bookData.id}
    />
  );

  const titleElement = getByText(bookData.title);
  const categoryElement = getByText(bookData.category);
  const imageElement = getByAltText("book-img");

  expect(titleElement).toBeTruthy();
  expect(categoryElement).toBeTruthy();
  expect(imageElement).toBeTruthy();

  bookData.authors.forEach((author) => {
    const authorElement = queryByText(author);
    expect(authorElement).toBeDefined();
  });
});
