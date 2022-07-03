import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import "../App.css";

const BookShelf = ({ CurrentShelf, title, setUpdate }) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {CurrentShelf.map((c) => {
                return (
                  c.imageLinks && (
                    <li key={c.id}>
                      <Book
                        key={c.id}
                        title={c.title}
                        author={c.authors}
                        shelf={c.shelf}
                        image={c.imageLinks}
                        id={c.id}
                        onUpdate={setUpdate}
                      />
                    </li>
                  )
                );
              })}
            </ol>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookShelf;
