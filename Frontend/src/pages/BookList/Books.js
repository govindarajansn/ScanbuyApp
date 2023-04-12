import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import ViewBook from "../../components/ViewBook/ViewBook";
import EditBook from "../../components/EditBook/EditBook";
import Header from "../../components/Header/Header";
import Book from "../../components/Book/Book";
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import "./BookList.scss";
import {
  AiOutlineFolderView,
  AiTwotoneEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { getAllBooks, deleteBook, updateBook } from '../../utils/apiUtils'


export default function Books() {
  const [books, setBooks] = useState();
  const [selectedBook, setSelectedBook] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenViewModal = (book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setSelectedBook(null);
    setIsViewModalOpen(false);
  };


  const handleAddComment = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedBook(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    async function fetchBooks() {
      const response = await getAllBooks();
      setBooks(response.data)
    }
    fetchBooks()
  }, []);

  const handleDeleteBook = async (isbn) => {
    setSelectedBook(null);
    await deleteBook(isbn);
    setBooks(books.filter((book) => book.isbn !== isbn));
    toast("Book Deleted");
  };


  const handleAddNotes = async (updatedBook) => {
    await updateBook(updatedBook);
    const updatedBooks = books.map(book => {
      if (book.isbn === updatedBook.isbn) {
        return updatedBook;
      } else {
        return book;
      }
    });
    setBooks(updatedBooks);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="book-title">My Library</div>
      <div className="books-container">
        {books && books.length > 0 ?
          books.map((book) => (
            <Book book={book} showStatus={true}>
              <div className="action-icons">
                <div className="pd-10"
                  onClick={() => {
                    handleOpenViewModal(book);
                  }}
                >
                  <AiOutlineFolderView data-tooltip-id="view-tooltip" data-tooltip-content="View Book" size={24}></AiOutlineFolderView>
                </div>
                <div className="pd-10"
                  onClick={() => {
                    handleAddComment(book);
                  }}
                >
                  <AiTwotoneEdit data-tooltip-id="edit-tooltip" data-tooltip-content="Edit Book" size={24} />
                </div>
                <div className="pd-10"
                  onClick={() => {
                    handleDeleteBook(book.isbn);
                  }}
                >
                  <AiOutlineDelete data-tooltip-id="delete-tooltip" data-tooltip-content="Delete Book" size={24} color={"red"}></AiOutlineDelete>
                </div>
              </div>
            </Book>
          )) : <div className="empty-books">No Books Available</div>}
      </div>
      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
        {selectedBook && (
          <ViewBook book={selectedBook} onClose={handleCloseViewModal} />
        )}
      </Modal>

      {/* Display edit book modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        {selectedBook && (
          <EditBook book={selectedBook} handleAddNotes={handleAddNotes} close={handleCloseEditModal} />
        )}
      </Modal>

      <Tooltip
        id="edit-tooltip"
        place="bottom"
      />
      <Tooltip
        id="delete-tooltip"
        place="bottom"
      />
      <Tooltip
        id="view-tooltip"
        place="bottom"
      />
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
  );
}
