import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from "../BooksAPI";
import { useEffect, useRef } from "react";
import Book from "./Book";

const SearchBook = ({ setUpdate }) => {
  const [books, setBooks] = useState([]);
  const [shelfBooks, setShelfBooks] = useState([]);
  const [booksearch, setBookSearch] = useState("");
  const searchBookRef = useRef();

  useEffect(() => {
    const BookSearch = async () => {
      const res = await BookAPI.search(searchBookRef.current.value);

      setBooks(res);
      setBookSearch("");
    };
    BookSearch();
  }, [booksearch]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      setShelfBooks(res);
    };
    getBooks();
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setBookSearch(e.target.value)}
            ref={searchBookRef}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books !== undefined &&
            books.length > 0 &&
            books.map((b) => {
              let shelf = shelfBooks.filter((f) => f.id === b.id);

              return (
                <li key={b.id}>
                  {shelf.length > 0 &&
                    (b.imageLinks && b.authors ? (
                      <>
                        <Book
                          key={b.id}
                          title={b.title}
                          author={b.authors}
                          shelf={shelf[0].shelf}
                          image={b.imageLinks}
                          id={b.id}
                          onUpdate={setUpdate}
                        />
                      </>
                    ) : null)}

                  {shelf.length === 0 &&
                    (b.imageLinks && b.authors ? (
                      <>
                        <Book
                          key={b.id}
                          title={b.title}
                          author={b.authors}
                          shelf={"none"}
                          image={b.imageLinks}
                          id={b.id}
                          onUpdate={setUpdate}
                        />
                      </>
                    ) : null)}
                </li>
              );
            })}
          {books === undefined && <div></div>}
        </ol>
      </div>
    </div>
  );
};

export default SearchBook;
