import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import ProjectsList from "./ProjectsList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";
import BookshelfHome from "./BookshelfHome";
import NewBook from "./NewBook";
import SingleBook from "./SingleBook";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ProjectsList} />
            <Route exact path="/project/create" component={NewProject} />
            <Route exact path="/project/:id" component={SingleProject} />
            <Route exact path="/bookshelf" component={BookshelfHome} />
            <Route exact path="/book/create" component={NewBook} />
            <Route exact path="/book/:id" component={SingleBook} />
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
