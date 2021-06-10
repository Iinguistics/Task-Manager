import React, { useState, useEffect } from "react";
import axios from "axios";

const NewProject = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const createNewProjectHandler = (e) => {
    e.preventDefault();

    try {
      const project = {
        name,
        description,
      };

      axios.post("/api/projects", project);
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
            <div className="card-header">Create new project</div>
            <div className="card-body">
              <form onSubmit={createNewProjectHandler}>
                <div className="form-group">
                  <label htmlFor="name">Project name</label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control ${
                      hasErrorFor("name") ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {renderErrorFor("name")}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Project description</label>
                  <textarea
                    id="description"
                    className={`form-control ${
                      hasErrorFor("description") ? "is-invalid" : ""
                    }`}
                    name="description"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {renderErrorFor("description")}
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

export default NewProject;
