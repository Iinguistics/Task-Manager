import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import ProjectsList from "./ProjectsList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";
import BookshelfHome from "./BookshelfHome";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ProjectsList} />
            <Route exact path="/task/create" component={NewProject} />
            <Route exact path="/task/:id" component={SingleProject} />
            <Route exact path="/bookshelf" component={BookshelfHome} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
