package com.coop.scanbuy.controller;

import com.coop.scanbuy.dto.BookDTO;
import com.coop.scanbuy.entity.Books;
import com.coop.scanbuy.exception.BookNotFoundException;
import com.coop.scanbuy.exception.DuplicateIsbnException;
import com.coop.scanbuy.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    @Autowired
    BookService bookService;

    @PostMapping("/add")
    public ResponseEntity<Books> createBook(@RequestBody Books book) {
        try {
            Books savedBook = bookService.addBook(book);
            return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
        } catch (DuplicateIsbnException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity getBookByIsbn(@PathVariable("id") Long isbn){
        try {
            Books book = bookService.getBookByIsbn(isbn);
            if(book == null) {
                throw new BookNotFoundException("Book not found with ISBN: " + isbn);
            }
            return ResponseEntity.ok(book);
        } catch (BookNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Books>> getAllBooks(){
        try {
            List<Books> books = bookService.getAllBooks();
            if(books.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable("id") Long isbn, @RequestBody Books book){
        try {
            book.setIsbn(isbn);
            Books updatedBook = bookService.updateBook(book);
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } catch (BookNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long isbn) {
        try {
            bookService.deleteBook(isbn);
            return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
        } catch (BookNotFoundException e) {
            return new ResponseEntity<>("BOOK_NOT_FOUND", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>("ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
