import React from "react";
import Loader from "../../public/loader.svg";
const userdeatailurl =
  "https://hotelappjwtlogin.herokuapp.com/api/auth/userInfo";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      userProfile: ""
    };
  }

  renderProfile = () => {
    if (!this.state.userProfile) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    } else {
      return (
        <>
          I am the profile page
          <h2>Hi, {this.state.userProfile.name}</h2>
          <button
            className="btn bg-danger"
            style={{ color: "white" }}
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </>
      );
    }
  };

  handleLogout = () => {
    sessionStorage.removeItem("ltk");
    this.setState({ userProfile: "" });
    this.props.history.push("/login");
  };

  render() {
    if (sessionStorage.getItem("ltk")) {
      return <div>{this.renderProfile()}</div>;
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    fetch(userdeatailurl, {
      method: "GET",
      headers: { "x-access-token": sessionStorage.getItem("ltk") }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userProfile: data });
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("name", data.name);
      });
  }
}

export default Profile;
