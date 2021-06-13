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

  const renderBooks = () => {
    if (books) {
      return books.map((book) => {
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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Books I Need to read</div>
            <div className="card-body">
              <Link className="btn btn-primary btn-sm mb-3" to="/book/create">
                Add new book
              </Link>
              <ul className="list-group list-group-flush">{renderBooks()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookshelfHome;
