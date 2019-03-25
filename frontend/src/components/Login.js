import React, { Component } from "react";

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    console.log("\n login componentDidMount, props: ", this.props);
    this.props.getUserProfile();
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendLoginRequest(Object.assign({}, this.state));
  }

  render() {
    console.log("login props:  " , this.props);
    const { email, password } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="title">password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
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
