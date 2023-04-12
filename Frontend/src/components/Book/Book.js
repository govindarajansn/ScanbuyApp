import React from "react";
import "./Book.scss";
import { AiFillStar } from "react-icons/ai";

const Book = ({ book, children, showStatus = false }) => {
  const date = new Date(book.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
  return (
    <div className="book">
      <img className="bookpic" alt="book" src={book.imageUrl}></img>
      <div className="bookinfo">
        <div className="title">{book.bookName}</div>
        <div className="author">{book.authorName}</div>
        <div className="pages"> {book.noPages > 0 ? `Pages: ${book.noPages}` : "No page information available."} </div>
        <div className="date">Date: {date}</div>
        {book.rating > 0 && <div className="rating"><AiFillStar></AiFillStar><div className="rating-number">{book.rating}</div></div>}
        {showStatus && <div className="pages" >
          <div className={book.isRead ? "completed" : "not-read"}>{book.isRead ? "Completed" : "Not Read"}</div>

        </div>}
        {children}
      </div>
    </div>
  );
};



export default Book;
