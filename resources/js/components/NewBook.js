import React, { useState, useEffect } from "react";
import axios from "axios";

const NewBook = ({ history }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
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

  const createNewBookHandler = (e) => {
    e.preventDefault();

    try {
      const book = {
        title,
        author,
      };

      axios.post("/api/projects", book);
      history.push("/");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Add new Book</div>
            <div className="card-body">
              <form onSubmit={createNewBookHandler}>
                <div className="form-group">
                  <label htmlFor="title">Book title</label>
                  <input
                    id="title"
                    type="text"
                    className={`form-control ${
                      hasErrorFor("title") ? "is-invalid" : ""
                    }`}
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {renderErrorFor("title")}
                </div>
                <div className="form-group">
                  <label htmlFor="author">Project Author</label>
                  <textarea
                    id="author"
                    className={`form-control ${
                      hasErrorFor("author") ? "is-invalid" : ""
                    }`}
                    name="author"
                    rows="10"
                    value={author}
                    onChange={(e) => setauthor(e.target.value)}
                  />
                  {renderErrorFor("author")}
                </div>
                <button className="btn btn-primary" type="submit">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
