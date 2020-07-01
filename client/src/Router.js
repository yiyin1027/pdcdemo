import React from "react";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import CreateProject from "./view/CreateProject";
import Test from "./view/Test/test";
import Home from "./view/Home/Home";
import Header from "./view/Header/Header";

// export const history = createBrowserHistory();

const Routers = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        {/*<Route exact path='/' component={Home}/>*/}
        <Route exact path='/create-project' component={CreateProject}/>
      </Switch>
    </Router>
  )
};

export default Routers;