import React, { Component } from "react";
import { getValueFromLocalStore } from "../utils/localStore";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const currentUser = getValueFromLocalStore('user');
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
