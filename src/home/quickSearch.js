import React from "react";
import "./quickSearch.css";
import { Link } from "react-router-dom";
import Loader from "../loader.svg";
const tripurl = "https://developerfunnel.herokuapp.com/booking";

class QuickSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      tripType: "",
      err: ""
    };
  }

  catchError = () => {
    if (this.state.err) {
      return <h3 style={{ color: "red" }}>{this.state.err}</h3>;
    }
  };

  renderTripTypes = () => {
    console.log(this.state);
    if (this.state.tripType) {
      let data = this.state.tripType;
      return data.map((item) => {
        return (
          <Link
            to={`/list/${item.trip}`}
            key={item._id}
            style={{ color: "Black", textDecoration: "none" }}
          >
            <div class="card">
              <img src={item.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <center>
                  <h3>{item.name}</h3>
                  <p class="card-text">Start Your {item.name} Trip With Us</p>
                </center>
              </div>
            </div>
          </Link>
        );
      });
    } else if (!this.state.tripType && !this.state.err) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <center>{this.catchError()}</center>
        <div style={{ width: "100%" }}>{this.renderTripTypes()}</div>
      </div>
    );
  }

  componentDidMount() {
    fetch(tripurl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tripType: data });
      })
      .catch((err) => {
        this.setState({
          err:
            "There is some issue while connecting, try checking your internet connection or try after some time"
        });
      });
  }
}

export default QuickSearch;
