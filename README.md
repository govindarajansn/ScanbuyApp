# `REST API PROJECT: Server-Side Skills Assessment`

## Objective: 
- Write a REST web service that allows users to inventory their books using Java Spring Boot as the framework and MySQL as the     database.

## Requirements:

- The service should allow users to add a book with attributes such as ISBN, title, author, number of pages, notes, and whether or not the book has been read.
- The API should include endpoints for getting a list of books, viewing/updating book details, and deleting books.

## Technologies Used:

- Java Spring Boot
- MySQL
- REST API

## Endpoints:

- /books - GET - Get a list of all books
- /books/{isbn} - GET - Get book details by ISBN
- /books/add - POST - Add a new book
- /books/{isbn} - PUT - Update an existing book by ISBN
- /books/{isbn} - DELETE - Delete an existing book by ISBN

## How to Use:

1. Clone the repository to your local machine.
2. Open the project in your preferred IDE.
3. Configure the MySQL database settings in the application.properties file.
4. Run the application.
5. Use a REST client, such as Postman, to test the endpoints.

## Application Property:

 server.port=8080

 spring.datasource.url=jdbc:mysql://localhost:3306/books

 spring.datasource.username=

 spring.datasource.password=

 spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

 spring.jpa.database-platform=org.hibernate.dialect.MySQL5Dialect

 spring.jpa.hibernate.ddl-auto=update

 spring.jpa.generate-ddl=true

 spring.jpa.show-sql=true

Add your own username and password

# `ScanBook Web Project: Front-end Assessment`

## Technologies Used

The ScanBook web application uses the following technologies:

- ReactJS: A popular JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for making API requests.
- React Router: A routing library for managing client-side routing in React applications.
- Google Books API: A RESTful web service provided by Google for accessing book information.

## Getting Started

To run the ScanBook web application locally, follow these steps:

- Clone the repository from GitHub
- Navigate to the project directory using cd
- Install the dependencies: npm install
- Start the development server: npm start
- Open a web browser and go to `http://localhost:3000` to access the ScanBook application.
# scanbook

