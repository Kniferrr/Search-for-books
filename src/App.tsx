import { Suspense } from "react";
import "./App.scss";
import BookList from "./components/BookList";
import Headder from "./components/Headder";
import { createHashRouter, RouterProvider } from "react-router-dom";
import BookPage from "./components/BookPage";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Suspense fallback={<div></div>}>
          <BookList />
        </Suspense>
      </>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <>
        <Suspense fallback={<div></div>}>
          <BookPage />
        </Suspense>
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <Headder />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
