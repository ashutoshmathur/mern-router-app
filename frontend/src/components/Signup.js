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
    console.log("signup props:  " , this.props);
    const { email, password, first_name, last_name } = this.state;
    return (
      <div id="signup">
        <h3>Signup</h3>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="title">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="title">First Name</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="title">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              onChange={this.handleChange}
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
