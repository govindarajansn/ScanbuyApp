export function serializeBook(book) {

  return {
    isbn: Number(book.volumeInfo.industryIdentifiers[0].identifier),
    bookName: book.volumeInfo.title,
    authorName: book.volumeInfo.authors.join(", "),
    publishedDate: book.volumeInfo.publishedDate || '',
    notes: "",
    rating: book.volumeInfo.averageRating || 0,
    imageUrl: book.volumeInfo.imageLinks?.thumbnail || "",
    noPages: book.pageCount,
    isRead: false
  };
}
