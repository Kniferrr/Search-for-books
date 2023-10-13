import axios from "axios";

const ApiUrl = "https://www.googleapis.com/books/v1";
const apiKey = "AIzaSyBN5vZMd7ZLarq1gBtBBq64vnTgrU29ovI";

export async function fetchBooks(
  pageNumber: number,
  query: string,
  sorting: string = "newest",
  category: string = "all",
  pageSize: number = 30
) {
  const newQuery =
    category !== "all" ? `${query}+subject:${category}` : `${query}`;
  try {
    const apiUrl = `${ApiUrl}/volumes`;
    const queryParams = {
      q: newQuery,
      startIndex: (pageNumber - 1) * pageSize,
      maxResults: pageSize,
      orderBy: sorting,

      key: apiKey,
    };

    const response = await axios.get(apiUrl, { params: queryParams });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Ошибка при запросе к Google Books API");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}

export async function fetchBookById(bookId: string) {
  try {
    const bookInfoResponse = await axios.get(`${ApiUrl}/volumes/${bookId}`, {
      params: { key: apiKey },
    });

    if (bookInfoResponse.status === 200) {
      return bookInfoResponse.data;
    } else {
      throw new Error("Ошибка при запросе информации о книге");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}
