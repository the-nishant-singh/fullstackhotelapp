import React, { Component } from "react";
import "./search.css";
const url = "https://developerfunnel.herokuapp.com/location";
const hotelurl = "https://developerfunnel.herokuapp.com/hotels?city=";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      location: "",
      hotels: ""
    };
  }

  renderHotel = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });
    }
  };

  renderCity = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option key={item._id} value={item.city}>
            {item.city_name}
          </option>
        );
      });
    }
  };

  cityChangeHandler = (e) => {
    const cityid = e.target.value;
    fetch(`${hotelurl}${cityid}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ hotels: data });
      });
  };

  handleHotel = (event) => {
    // this.props.history.push(`/details/${event.target.value}`);
    console.log(this.props.history);
  };

  render() {
    console.log(">>>props>>", this.props);
    return (
      <div className="container">
        <div className="card bg-danger text-white" style={{ width: "80%" }}>
          <div className="card-body">
            <center>
              <h2>Your Next Trip Is On Us</h2>
              <h4>Plan Your Journey Here</h4>
              <br />
              <span className="span">Select City here</span>
              <select className="dropdown" onChange={this.cityChangeHandler}>
                <option defaultValue={true}>Select Location</option>
                {this.renderCity(this.state.location)}
              </select>
              <span className="span">Select Hotel here</span>
              <select className="dropdown" onChange={this.handleHotel}>
                <option defaultValue={true}>Select Hotel</option>
                {this.renderHotel(this.state.hotels)}
              </select>
            </center>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Search;
