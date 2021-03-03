import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import validator from "validator";
const loginUrl = "https://hotelappjwtlogin.herokuapp.com/api/auth/login";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      err: ""
    };
  }

  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value
    });
  };
  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  submitHandler = () => {
    if (!this.state.email || !this.state.password) {
      this.setState({ err: "Both email and password feilds are required" });
    } else {
      if (!validator.isEmail(this.state.email)) {
        this.setState({ err: "Invalid email" });
      } else {
        this.setState({ err: "" });
        let logininfo = {
          email: this.state.email,
          password: this.state.password
        };
        fetch(loginUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(logininfo)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.auth === true) {
              sessionStorage.setItem("ltk", data.token);
              this.props.history.push("/profile");
            } else {
              this.setState({ err: data.error });
            }
          })
          .catch((errors) => {
            this.setState({
              err: errors.error
            });
          });
      }
    }
  };
  render() {
    return (
      <div className="loginform">
        <div className="card" id="logincard">
          <center>
            <h2>Login</h2>
          </center>
          <div className="form-group">
            <h6 className="loginerrmess">{this.state.err}</h6>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.emailChangeHandler}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.passwordChangeHandler}
              value={this.state.password}
            />
          </div>
          <button
            className="btn btn-danger"
            id="loginbtn"
            onClick={this.submitHandler}
          >
            Submit
          </button>
          <span className="loginspan">
            New User? <Link to="/register">Sign Up</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
