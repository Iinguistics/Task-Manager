import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import ProjectsList from "./ProjectsList";
import NewProject from "./NewProject";
import SingleProject from "./SingleProject";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ProjectsList} />
            <Route exact path="/create" component={NewProject} />
            <Route exact path="/:id" component={SingleProject} />
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
