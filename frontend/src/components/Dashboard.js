import React, { Component } from "react";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("\n dashboard componentDidMount, props: ", this.props);
    this.props.getUserProfile();
  }
  
  onLogoutBtnClick = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    console.log("\n dahboard props:  ", this.props);
    return (
      <div>
        <h3>Dashboard</h3>
        <br/>
        <button onClick={this.onLogoutBtnClick}>
            Logout
        </button>
      </div>
    );
  }
}
