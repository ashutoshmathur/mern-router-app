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
      <div 
      id="dashboard" 
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <h3>Dashboard</h3>
        <button style={{ maxWidth: '200px' }} onClick={this.onLogoutBtnClick}>
            Logout
        </button>
      </div>
    );
  }
}
