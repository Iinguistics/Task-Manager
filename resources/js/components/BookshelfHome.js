import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookshelfHome = () => {
  const [books, setBooks] = useState(null);

  const fetchBooks = async () => {
    const { data } = await axios.get("/api/books");
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);

  const renderNonReadBooks = () => {
    if (books) {
      return books.map((book) => {
        if (!book.is_read)
          return (
            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to={`/book/${book.id}`}
              key={book.id}
            >
              {book.title}
              <span className="">By: {book.author}</span>
            </Link>
          );
      });
    }
  };

  const renderReadBooks = () => {
    if (books) {
      return books.map((book) => {
        if (book.is_read)
          return (
            <Link
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              to={`/book/${book.id}`}
              key={book.id}
            >
              {book.title}
              <span className="">By: {book.author}</span>
            </Link>
          );
      });
    }
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary btn-sm my-3" to="/book/create">
        Add new book
      </Link>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Books I Need to read</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {renderNonReadBooks()}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Books I have read</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {renderReadBooks()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookshelfHome;
