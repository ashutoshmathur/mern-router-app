import React, { Component } from "react";
import { getValueFromLocalStore } from "../utils/localStore";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("\n landing page componentDidMount, props: ", this.props);
    const currentUser = getValueFromLocalStore('user');
    console.log("\n\n currentUser:   ", currentUser);
    if(currentUser) {
      this.props.getUserProfile();
    }
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <h1>Welcome</h1>
        <button 
        style={{
          width: 200
        }}
        onClick={this.onLoginBtnClick}>
            Login
        </button>
        <button 
        style={{
          width: 200
        }}
        onClick={this.onRegisterBtnClick}>
            Register
        </button>
      </div>
    );
  }
}
