import React, { useEffect, useState } from "react";
import * as BookAPI from "../BooksAPI";
import "../App.css";

const Book = ({ title, author, shelf, image, id, onUpdate }) => {
  const [updateShelf, setUpdateShelf] = useState("");

  useEffect(() => {
    if (updateShelf) {
      const updating = async () => {
        const res = await BookAPI.update({ id: id }, updateShelf);
        const gett = await BookAPI.getAll();
        onUpdate(gett);
        console.log(res);
      };
      updating();
    }
  }, [updateShelf, id, onUpdate]);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${image["thumbnail"]})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          {shelf !== "none" && (
            <select
              value={shelf}
              onChange={(e) => setUpdateShelf(e.target.value)}
            >
              <option value="MoveTo" disabled>
                Move to...
              </option>
              <option value="none"> None </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          )}
          {shelf === "none" && (
            <select
              value="none"
              onChange={(e) => setUpdateShelf(e.target.value)}
            >
              <option value="MoveTo" disabled>
                Move to...
              </option>
              <option value="none"> None </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          )}
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  );
};

export default Book;
