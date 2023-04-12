import { appAxios, googleBooksApiAxios } from './axiosConfig'

export const getGoogleBookByISBN = async (searchTerm) => {
  const url = `/volumes?q=isbn:${searchTerm}`;
  const response = await googleBooksApiAxios.get(url);
  return response.data;

};

export const searchBookFromDatabase = async (isbn) => {
  const url = `/books/${isbn}`;
  const response = await appAxios.get(url);
  return response;
};

// Function to make a POST request to add a book to the database
export async function addBookToDatabase(book) {
  const url = `/books/add`;
  const response = await appAxios.post(url, book, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response
}

export async function addMarkAsRead(book) {
  const url = `/books/${book.isbn}`;
  const response = await appAxios.put(url, book);
  return response;

}


export async function updateBook(book) {
  const url = `/books/${book.isbn}`;
  const response = await appAxios.put(url, book);
  return response
}

export async function deleteBook(isbn) {
  const url = `/books/${isbn}`;
  const response = await appAxios.delete(url);
  return response;
}



export async function getAllBooks() {
  const url = "/books/getAll";
  const response = await appAxios.get(url);
  return response;
}