import React, { useState, useEffect } from "react";
import axios from "axios";

const NewBook = ({ history }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
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
        category,
      };

      axios.post("/api/books", book);
      history.push("/bookshelf");
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
                  <label htmlFor="author">Book Author</label>
                  <input
                    id="author"
                    className={`form-control ${
                      hasErrorFor("author") ? "is-invalid" : ""
                    }`}
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {renderErrorFor("author")}
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option selected value="">
                    Choose a category
                  </option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="fiction">Fiction</option>
                  <option value="biography">Biography</option>
                </select>
                <br />
                <button className="btn btn-primary my-3" type="submit">
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
