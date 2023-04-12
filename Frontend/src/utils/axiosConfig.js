import axios from "axios";

// Create a reusable Axios instance with a default baseURL
const appAxios = axios.create({
    baseURL: "http://localhost:8080",
});

// Create a Google Books API instance with a different baseURL
const googleBooksApiAxios = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
});

// Export the reusable instance and the Google Books API instance
export { appAxios, googleBooksApiAxios };
