import React, { Component } from "react";

export default class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    };
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendSignupRequest(Object.assign({}, this.state));
  }
  
  render() {
    const { email, password, first_name, last_name } = this.state;
    return (
      <div 
      id="signup" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h3>Signup</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <label htmlFor="title">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.handleChange}
              required
            />
            <br/>
            <label htmlFor="title">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <br/>
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              id="first_name"
              placeholder="Enter First Name"
              value={first_name}
              onChange={this.handleChange}
              required
            />
            <br/>
            <label htmlFor="title">Last Name</label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter Last Name"
              value={last_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg">
            Login
          </button>
        </form>
      </div>
    );
  }
}
