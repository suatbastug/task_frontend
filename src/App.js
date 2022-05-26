import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./Upload/Upload";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Upload} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
