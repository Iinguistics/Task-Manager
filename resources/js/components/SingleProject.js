import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleProject = ({ match }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);

  const fetchProject = async () => {
    const { data } = await axios.get(`/api/projects/${match.params.id}`);
    setProject(data);
    setTasks(data.tasks);
  };

  useEffect(() => {
    fetchProject();
  }, []);

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

              <button className="btn btn-primary btn-sm">
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

            <button className="btn btn-primary btn-sm">
              Mark as completed
            </button>
            <hr />
            {renderTasks()}
          </div>
        </>
      );
    }
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
