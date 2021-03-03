import React, { Component } from "react";
import Loader from "../loader.svg";
import "./details.css";
import RoomTypeTags from "./roomtypetags";
const hoteldet = "https://developerfunnel.herokuapp.com/hotelsdetails";

class Details extends Component {
  constructor() {
    super();

    this.state = {
      hoteldetails: "",
      err: ""
    };
  }

  bookNowHandler = () => {
    if (sessionStorage.getItem("ltk")) {
      this.props.history.push(`/bookticket/${this.state.hoteldetails._id}`);
    } else this.props.history.push("/login");
  };

  renderHotelDetails = (data) => {
    if (data) {
      return (
        <div className="hoteldetails">
          <div>
            <img src={data.thumb} className="img-fluid" alt="..." />
          </div>
          <div>
            <h1>
              <b>{data.name}</b>
            </h1>
            <div className="tags">
              <RoomTypeTags data={this.state.hoteldetails.type} />
            </div>
            <div className="tags">
              <RoomTypeTags data={this.state.hoteldetails.tripType} />
            </div>
            <div>
              <b>Contact: +917979868224</b>
            </div>
            <div>
              <b>Email: hotels@hotelapp.com</b>
            </div>
            <div>
              <b>{data.locality}</b>
            </div>
            <div>
              <b>{data.address}</b>
            </div>
            <div className="text-danger">
              <b>Cost &#x20B9;{data.cost}/day</b>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginTop: "10px" }}
              onClick={() => this.bookNowHandler()}
            >
              Book Now
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    }
  };
  render() {
    return <div>{this.renderHotelDetails(this.state.hoteldetails)}</div>;
  }

  componentDidMount() {
    const url = `${hoteldet}/${this.props.match.params.id}`;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          hoteldetails: data[0]
        });
      })
      .catch((err) => {
        this.setState({
          err:
            "There is some issue while connecting, try checking your internet connection or try after some time"
        });
      });
  }
}

export default Details;
