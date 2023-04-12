package com.coop.scanbuy.service;

import com.coop.scanbuy.dto.BookDTO;
import com.coop.scanbuy.entity.Books;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;


public interface BookService {
    public Books addBook(Books book);
    public Books getBookByIsbn(Long isbn);
    public List<Books> getAllBooks();
    public Books updateBook(Books book);
    void deleteBook(Long isbn);
}
