package com.coop.scanbuy.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookDTO {
    Integer isbn;

    String bookName;

    String authorName;

    int noPages;

    String notes;

    boolean isRead;

    float rating;

    String imageUrl;

}