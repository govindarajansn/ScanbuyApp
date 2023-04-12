package com.coop.scanbuy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.stereotype.Service;

import java.util.Date;

@Entity
@Data
@Getter
@Setter
@Table(name="BOOKS")
public class Books {


    @Id
    @NonNull
    Long isbn;

    @NonNull
    String bookName;
    @NonNull
    String authorName;

    int noPages;

    Date publishedDate;

    String notes;

    Boolean isRead;

    Float rating;

    String imageUrl;
    public Books(){

    }
}
