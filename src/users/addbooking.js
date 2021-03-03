import React from "react";
import "./addbooking.css";
import Loader from "../loader.svg";
const bookUrl = "https://hotelappjwtlogin.herokuapp.com/api/auth/addbooking";

class BookTicket extends React.Component {
  constructor() {
    super();

    this.state = {
      hotel: "",
      price: "",
      name: sessionStorage.getItem("name"),
      date: "",
      status: "Pending",
      city: "",
      hotelid: "",
      bookeremail: sessionStorage.getItem("email"),
      phone: "",
      err: ""
    };
  }

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  dateChangeHandler = (event) => {
    this.setState({ date: event.target.value });
  };
  phoneChangeHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  renderBookingForm = () => {
    if (!this.state.hotel) {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    } else {
      return (
        <div className="loginform">
          <div className="card" id="logincard">
            <center>
              <h2>
                <u>Book Ticket</u>
              </h2>
            </center>
            <div className="form-group">
              <h6 className="loginerrmess">{this.state.err}</h6>
              <label htmlFor="hotelName">Hotel</label>
              <input
                id="hotelName"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Hotel Name"
                value={this.state.hotel}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Cost"
                value={this.state.price}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                id="Name"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Name"
                value={this.state.name}
                onChange={this.nameChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="todaydate">Date</label>
              <input
                type="date"
                min="2021-03-02"
                className="form-control"
                id="todaydate"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.date}
                onChange={this.dateChangeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="todaydate">Phone</label>
              <input
                type="number"
                min="2021-03-02"
                className="form-control"
                id="todaydate"
                aria-describedby="emailHelp"
                placeholder="Enter Phone"
                value={this.state.phone}
                onChange={this.phoneChangeHandler}
              />
            </div>
            <button
              className="btn btn-danger"
              id="loginbtn"
              onClick={this.submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  submitHandler = () => {
    console.log(this.state);
    let {
      name,
      hotel,
      price,
      date,
      status,
      city,
      hotelid,
      bookeremail,
      phone
    } = this.state;
    console.log();
    if (!name || !date || !phone) {
      this.setState({ err: "All feilds are required" });
    } else if (this.state.name.length < 3) {
      this.setState({ err: "Invalid Name" });
    } else if (this.state.phone.length !== 10) {
      this.setState({ err: "Invalid phone" });
    } else {
      this.setState({ err: "" });
      const book = {
        hotel,
        price,
        date,
        status,
        city,
        hotelid,
        bookeremail,
        phone,
        name
      };
      fetch(bookUrl, {
        method: "POST",
        headers: {
          "x-access-token": sessionStorage.getItem("ltk"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.history.push("/bookings");
        });
    }
  };

  render() {
    return <div>{this.renderBookingForm()}</div>;
  }

  componentDidMount() {
    let hotelUrl = `https://developerfunnel.herokuapp.com/hotelsdetails/${this.props.match.params.id}`;
    fetch(hotelUrl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          hotel: data[0].name,
          city: data[0].city_name,
          price: data[0].cost,
          hotelid: data[0]._id
        });
      });

    // let now = new Date();
    // let day = ("0" + now.getDate()).slice(-2);
    // let month = ("0" + now.getDate()).slice(-2);
    // let today = now.getFullYear() + "-" + month + "-" + day;
    // document.getElementById("todaydate").setAttribute("min", today);
  }
}

export default BookTicket;
