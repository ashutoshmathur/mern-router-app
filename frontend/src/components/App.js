import React from "react";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Dashboard from "../containers/Dashboard";
import LandingPage from "../containers/LandingPage";
import { Route, Switch } from "react-router-dom";

const App = (props) => (  
      <div id="app">  
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
);
export default App;
