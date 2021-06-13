import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleBook = ({ match, history }) => {
  const [book, setbook] = useState(null);
  const [errors, setErrors] = useState([]);

  const hasErrorFor = (field) => {
    return errors[field];
  };

  const renderErrorFor = (field) => {
    if (hasErrorFor(field)) {
      return (
        <span className="invalid-feedback">
          <strong>{errors[field][0]}</strong>
        </span>
      );
    }
  };

  const fetchbook = async () => {
    const { data } = await axios.get(`/api/books/${match.params.id}`);
    setbook(data);
  };

  useEffect(() => {
    fetchbook();
  }, []);

  const markbookAsCompletedHandler = () => {
    axios.put(`/api/books/${book.id}`);

    history.push("/bookshelf");
  };

  const renderbook = () => {
    if (book) {
      return (
        <>
          <div className="card-header">{book.title}</div>
          <div className="card-body">
            <p>{book.author}</p>
            <p>{book.category}</p>

            <button
              className="btn btn-primary btn-sm"
              onClick={markbookAsCompletedHandler}
            >
              Mark as read
            </button>
            <hr />
          </div>
        </>
      );
    }
  };

  const addNewTaskHandler = async (e) => {
    e.preventDefault();

    const task = {
      title,
      book_id: book.id,
    };

    const { data } = await axios.post("/api/tasks", task);
    setTitle("");

    setTasks([...tasks, data]);
  };

  console.log(book);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">{renderbook()}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;