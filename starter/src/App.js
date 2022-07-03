import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import SearchBook from "./components/SearchBook";
import * as BookAPI from "./BooksAPI";
import TitleBar from "./components/TitleBar";

function App() {
  const [shelfBooks, setShelfBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      setShelfBooks(res);
    };
    getBooks();
  }, []);

  let CR = shelfBooks.filter((f) => f.shelf === "currentlyReading");
  let WTR = shelfBooks.filter((f) => f.shelf === "wantToRead");
  let Read = shelfBooks.filter((f) => f.shelf === "read");

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <TitleBar />
              <BookShelf
                CurrentShelf={CR}
                title="Continue Reading"
                setUpdate={setShelfBooks}
              />
              <BookShelf
                CurrentShelf={WTR}
                title="Want to Read"
                setUpdate={setShelfBooks}
              />
              <BookShelf
                CurrentShelf={Read}
                title="Read"
                setUpdate={setShelfBooks}
              />
            </>
          }
        ></Route>

        <Route
          path="/search"
          element={<SearchBook setUpdate={setShelfBooks} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
