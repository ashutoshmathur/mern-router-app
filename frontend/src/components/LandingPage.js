import React, { Component } from "react";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginBtnClick = (event) => {
    event.preventDefault();
    const location = {
      pathname: '/login',
      state: {}
    }
    this.props.history.push(location);
  }

  onRegisterBtnClick = (event) => {
    event.preventDefault();
    const location = {
      pathname: '/register',
      state: {}
    }
    this.props.history.push(location);
  }

  render() {
    console.log("\n landing page props:  ", this.props);
    return (
      <div>
        <h3>Welcome</h3>
        <br/>
        <button onClick={this.onLoginBtnClick}>
            Login
        </button>
        <button onClick={this.onRegisterBtnClick}>
            Register
        </button>
      </div>
    );
  }
}
