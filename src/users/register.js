import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import validator from "validator";

const registerUrl = "https://hotelappjwtlogin.herokuapp.com/api/auth/register";

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      role: "User",
      err: ""
    };
  }

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  emailChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  passwordChangeHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  registerHandler = () => {
    if (!this.state.email || !this.state.password || !this.state.name) {
      this.setState({ err: "All feilds are required" });
    } else if (this.state.name.length < 3) {
      this.setState({ err: "Invalid Name" });
    } else if (!validator.isEmail(this.state.email)) {
      this.setState({ err: "Invalid email" });
    } else {
      this.setState({ err: "" });
      const registerdetails = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
      };
      fetch(registerUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerdetails)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.register === false) {
            this.setState({ err: data.error });
          } else {
            this.props.history.push("/login");
          }
        });
    }
  };

  render() {
    return (
      <div className="loginform">
        <div className="card" id="logincard">
          <center>
            <h2>Register</h2>
          </center>
          <div className="form-group">
            <h6 className="loginerrmess">{this.state.err}</h6>
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              value={this.state.name}
              onChange={this.nameChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.emailChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={this.state.password}
              onChange={this.passwordChangeHandler}
            />
          </div>
          <button
            className="btn btn-danger"
            id="loginbtn"
            onClick={this.registerHandler}
          >
            Submit
          </button>
          <span>
            Already Registered? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Register;
