import React, { useState } from "react";
import {
  addBookToDatabase,
  getGoogleBookByISBN,
  searchBookFromDatabase,
  addMarkAsRead,
} from "../../utils/apiUtils";
import Book from "../Book/Book";
import { Tooltip } from 'react-tooltip'
import { BiBookmarkPlus } from "react-icons/bi";
import { AiOutlineSearch, AiOutlineRead } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { isValidISBN } from '../../utils/validationUtils'
import { serializeBook } from "../../utils/serializeModel";
import "./SearchForm.scss";

function SearchBox() {
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");
  const [book, setBook] = useState(null);

  const handleSearch = async () => {

    if (!isValidISBN(isbn)) {
      setError("Enter valid ISBN")
      setBook(null)
    } else {
      setError("")
    }

    try {
      const response = await searchBookFromDatabase(isbn);
      if (response.status === 200) {
        setBook({ ...response.data, bookInDB: true });
        toast("Fetching book from Database");
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast("Fetching book from google");
        const response = await getGoogleBookByISBN(isbn);
        setBook(serializeBook(response.items[0]))
      }
    }
  };

  const handleBookToDataBase = async (book) => {
    await addBookToDatabase(book);
    const updatedBook = { ...book, bookInDB: true }
    setBook(updatedBook);
    toast.success("Book Added!");
  };

  const handleMarkAsRead = async (book) => {
    const updateBook = { ...book, isRead: !book.isRead }
    if (book.bookInDB) {
      await addMarkAsRead(updateBook);
      toast.success("Book Read !");
    } else {
      await addBookToDatabase(updateBook);
      toast.success("Book Added!");
    }
    setBook(updateBook);
  };

  console.log(book)
  return (
    <>
      <div className="search-form">
        <div className="search-title">Search Books</div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            id="isbn"
            value={isbn}
            placeholder="Search by ISBN"
            onChange={(e) => setIsbn(e.target.value)}
          />
          <button class="search-button" onClick={handleSearch}>
            <AiOutlineSearch size={16}></AiOutlineSearch>
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {book && <section className="search-results">
          <Book book={book} showStatus={false}>
            <div className="action-icon" >
              {!book.bookInDB && <div
                onClick={() => {
                  handleBookToDataBase(book);
                }}
              >
                <BiBookmarkPlus data-tooltip-id="book-mark-tooltip" data-tooltip-content="Add Book" size={24}></BiBookmarkPlus>
              </div>}

              <div id="markRead"
                onClick={() => {
                  handleMarkAsRead(book);
                }}

              >
                <AiOutlineRead data-tooltip-id="read-book-tooltip" data-tooltip-content={book.isRead ? "Mark UnRead" : "Mark Read"} id="markRead" size={24}></AiOutlineRead>
              </div>
            </div>
          </Book>
        </section>}

        <ToastContainer position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />

      </div>
      <Tooltip
        id="read-book-tooltip"
        place="bottom"
      />
      <Tooltip
        id="book-mark-tooltip"
        place="bottom"
      />
    </>
  );
}

export default SearchBox;
