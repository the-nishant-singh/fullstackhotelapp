import React from "react";
import Loader from "../loader.svg";

const userdeatailurl =
  "https://hotelappjwtlogin.herokuapp.com/api/auth/userInfo";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: ""
    };
  }

  renderAdmin = () => {
    if (!sessionStorage.getItem("ltk")) {
      this.props.history.push("/login");
    } else if (!this.state.profile) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    } else if (this.state.profile.role !== "Admin") {
      return (
        <center>
          <h3>You are not an admin</h3>
        </center>
      );
    } else {
      return <>this is the admin page</>;
    }
  };

  render() {
    return <div>{this.renderAdmin()}</div>;
  }

  componentDidMount() {
    fetch(userdeatailurl, {
      method: "GET",
      headers: { "x-access-token": sessionStorage.getItem("ltk") }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ profile: data });
      });
  }
}

export default Admin;
