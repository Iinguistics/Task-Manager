import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  const [projects, setProjects] = useState(null);
  const [test, setTest] = useState(null);

  const fetchProjects = async () => {
    const { data } = await axios.get("/api/projects");
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const renderProjects = () => {
    if (projects) {
      return projects.map((project) => {
        return (
          <Link
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            to={`/project/${project.id}`}
            key={project.id}
          >
            {project.name}
            <span className="badge badge-primary badge-pill">
              {project.tasks_count}
            </span>
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
            <div className="card-header">All projects</div>
            <div className="card-body">
              <Link
                className="btn btn-primary btn-sm mb-3"
                to="/project/create"
              >
                Create new project
              </Link>
              <ul className="list-group list-group-flush">
                {renderProjects()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
