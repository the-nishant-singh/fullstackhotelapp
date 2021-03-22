import React, { Component } from "react";
import Loader from "../loader.svg";
import "./viewbookings.css";
const url = "https://hotelappjwtlogin.herokuapp.com/api/auth/yourbookings";

class Bookings extends Component {
  constructor() {
    super();

    this.state = {
      bookingData: "",
      filterdata: ""
    };
  }

  radioChangeHandler = (event) => {
    this.setState({ filterdata: "" });
    let word;
    if (event.target.value === "1") {
      word = "yourbookings";
    } else if (event.target.value === "2") {
      word = "yourcnfbookings";
    } else if (event.target.value === "3") {
      word = "yourcanbookings";
    } else if (event.target.value === "4") {
      word = "yourpenbookings";
    }

    const newUrl = `https://hotelappjwtlogin.herokuapp.com/api/auth/${word}`;
    fetch(newUrl, {
      method: "GET",
      headers: { "x-access-token": sessionStorage.getItem("ltk") }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ filterdata: data.reverse() });
      });
  };

  renderPage = () => {
    if (!this.state.bookingData) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    } else {
      return (
        <>
          <div className="column1">
            <div>
              <input
                id="all"
                type="radio"
                name="bookfilter"
                value="1"
                onChange={this.radioChangeHandler}
                defaultChecked
              />
              <label id="all1" htmlFor="all">
                All
              </label>
            </div>
            <div>
              <input
                id="cnf"
                type="radio"
                name="bookfilter"
                value="2"
                onChange={this.radioChangeHandler}
              />
              <label id="cnf1" htmlFor="cnf">
                Confirmed
              </label>
            </div>
            <div>
              <input
                id="can"
                type="radio"
                name="bookfilter"
                value="3"
                onChange={this.radioChangeHandler}
              />
              <label id="can1" htmlFor="can">
                Cancelled
              </label>
            </div>
            <div>
              <input
                id="pen"
                type="radio"
                name="bookfilter"
                value="4"
                onChange={this.radioChangeHandler}
              />
              <label id="pen1" htmlFor="pen">
                Pending
              </label>
            </div>
          </div>
          <div className="column2">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>{this.renderUserBookings()}</tbody>
            </table>
          </div>
        </>
      );
    }
  };

  renderUserBookings = () => {
    if (!this.state.filterdata) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    } else {
      return this.state.filterdata.map((item) => {
        return (
          <tr className="table-danger" key={item._id}>
            <td>{item.date}</td>
            <td>{item.hotel}</td>
            <td>{item.price}</td>
            <td className={item.status}>
              <b>{item.status}</b>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <center>
          <b>
            <u>
              <h3>Your Bookings</h3>
            </u>
          </b>
        </center>
        {this.renderPage()}
      </div>
    );
  }

  componentDidMount() {
    fetch(url, {
      method: "GET",
      headers: { "x-access-token": sessionStorage.getItem("ltk") }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          bookingData: data.reverse()
        });
        this.setState({
          filterdata: this.state.bookingData
        });
      });
  }
}

export default Bookings;
