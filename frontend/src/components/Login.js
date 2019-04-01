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
    const { email, password } = this.state;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h3>Login</h3>

        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <label htmlFor="title">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              id="email"
              value={email}
              onChange={this.handleChange}
              required />

            <label htmlFor="title">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={this.handleChange}
              required />

            <button type="submit">Login</button>

          </div>
        </form>
      </div>
    );
  }
}
