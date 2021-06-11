import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleProject = ({ match, history }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
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

  const fetchProject = async () => {
    const { data } = await axios.get(`/api/projects/${match.params.id}`);
    setProject(data);
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const markProjectAsCompletedHandler = () => {
    axios.put(`/api/projects/${project.id}`);

    history.push("/");
  };

  const markTaskAsCompletedHandler = async (taskId) => {
    await axios.put(`/api/tasks/${taskId}`);
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskId;
      })
    );
  };

  const renderTasks = () => {
    if (tasks) {
      return (
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={task.id}
            >
              {task.title}

              <button
                className="btn btn-primary btn-sm"
                onClick={() => markTaskAsCompletedHandler(task.id)}
              >
                Mark as completed
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const renderProject = () => {
    if (project) {
      return (
        <>
          <div className="card-header">{project.name}</div>
          <div className="card-body">
            <p>{project.description}</p>

            <button
              className="btn btn-primary btn-sm"
              onClick={markProjectAsCompletedHandler}
            >
              Mark as completed
            </button>
            <hr />
            {renderTasks()}
            <form onSubmit={addNewTaskHandler}>
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  className={`form-control ${
                    hasErrorFor("title") ? "is-invalid" : ""
                  }`}
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    Add
                  </button>
                </div>
                {renderErrorFor("title")}
              </div>
            </form>
          </div>
        </>
      );
    }
  };

  const addNewTaskHandler = async (e) => {
    e.preventDefault();

    const task = {
      title,
      project_id: project.id,
    };

    const { data } = await axios.post("/api/tasks", task);
    setTitle("");

    setTasks([...tasks, data]);
  };

  console.log(project);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">{renderProject()}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
