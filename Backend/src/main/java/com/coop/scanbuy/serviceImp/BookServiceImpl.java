package com.coop.scanbuy.serviceImp;

import com.coop.scanbuy.dto.BookDTO;
import com.coop.scanbuy.entity.Books;

import com.coop.scanbuy.exception.BookNotFoundException;
import com.coop.scanbuy.exception.DuplicateIsbnException;
import com.coop.scanbuy.repository.BookRepository;
import com.coop.scanbuy.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;

    @Override
    public Books addBook(Books book) {
        Optional<Books> optionalBook = bookRepository.findById(book.getIsbn());
        if (optionalBook.isPresent()) {
            throw new DuplicateIsbnException("ISBN already exists: " + book.getIsbn());
        }
        return bookRepository.save(book);
    }


    @Override
    public Books getBookByIsbn(Long isbn) {
        Optional<Books> optionalBook = bookRepository.findById(isbn);
        if (optionalBook.isPresent()) {
            return optionalBook.get();
        } else {
            throw new BookNotFoundException("Book not found for ISBN: " + isbn);
        }
    }


    @Override
    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Books updateBook(Books book) {
        Optional<Books> optionalBook = bookRepository.findById(book.getIsbn());
        if (optionalBook.isPresent()) {
            Books existingBook = optionalBook.get();
            existingBook.setNotes(book.getNotes());
            existingBook.setIsRead(book.getIsRead());
            Books updatedBook = bookRepository.save(existingBook);
            return updatedBook;
        } else {
            throw new BookNotFoundException("Book not found with ISBN: " + book.getIsbn());
        }
    }


    @Override
    public void deleteBook(Long isbn) throws BookNotFoundException {
        Optional<Books> optionalBook = bookRepository.findById(isbn);
        if (optionalBook.isPresent()) {
            bookRepository.deleteById(isbn);
        } else {
            throw new BookNotFoundException("Book not found with ISBN: " + isbn);
        }
    }

}
