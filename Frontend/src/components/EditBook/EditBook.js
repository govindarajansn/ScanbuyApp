import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Book from "../Book/Book";
import "./EditBook.scss";

const EditBook = ({ book, handleAddNotes, close }) => {
  const [notes, setNotes] = useState(book.notes);
  const [isRead, setIsRead] = useState(book.isRead);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedBook = {
      ...book,
      notes,
      isRead
    };
    handleAddNotes(updatedBook)
    toast("Book Updated");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="edit-book-container">
        <div className="edit-book-title">Edit Book</div>
        <Book book={book} showStatus={true}></Book>
        <div className="pd-7">
          <label className="edit-book-label">
            <input
              type="checkbox"
              checked={isRead}
              onChange={() => setIsRead(!isRead)}
            />
            <span className="edit-book-checkbox-label">Mark as read</span>
          </label></div>
        <label className="edit-book-label">
          Notes:
          <textarea
            className="edit-book-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="submit" className="edit-book-btn save-btn">
            Save
          </button>
          <button
            type="button"
            onClick={close}
            className="edit-book-btn cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
};

export default EditBook;
