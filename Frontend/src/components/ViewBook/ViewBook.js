import React from "react";
import "./ViewBook.scss";
import Book from "../Book/Book";

const ViewBook = ({ book }) => {
  return (
    <div>
      <div className="title">Book Details</div>
      <Book book={book} showStatus={true}></Book>
      <div className="comments">
        <div>Notes:</div>
        {book.note && <div>
          <pre>{book.notes}</pre>
        </div>}
      </div>
    </div>
  );
};

export default ViewBook;
