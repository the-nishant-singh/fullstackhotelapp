import React from "react";
import "./listing.css";
import Loader from "../loader.svg";
const url = "https://developerfunnel.herokuapp.com/hotellist";

class Listing extends React.Component {
  constructor() {
    super();
    this.state = {
      hotels: "",
      filter: ""
    };
  }

  detailsHandler = (id) => {
    this.props.history.push(`/details/${id}`);
  };

  renderHotels() {
    if (this.state.hotels) {
      return this.state.hotels.map((item) => {
        return (
          <div
            className="card"
            key={item._id}
            style={{ margin: "auto", width: "100%", marginBottom: "20px" }}
          >
            <div className="row g-0">
              <div className="col-md-4" id="imgcard">
                <img className="hotelcardimg" src={item.thumb} alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <center>
                    <h5 className="card-title">
                      {item.name} | {item.city_name}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted">{item.locality}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">{item.address}</small>
                    </p>
                  </center>
                  <div className="priceandbutton">
                    <span>
                      <b>&#x20B9;{item.cost}/day</b>
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.detailsHandler.bind(this, item._id)}
                    >
                      More Deatils
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <center>
          <img src={Loader} alt="loader" />
        </center>
      );
    }
  }

  render() {
    return (
      <>
        <center>
          <h1>Listings</h1>
        </center>
        <div className="row">
          <div className="col1">
            <center>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Select Filter Here
              </button>
            </center>
          </div>
          <div className="col2">
            <p>{this.state.hotels.length} results:</p>
            {this.renderHotels()}
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Apply Filters
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  Room Filter:
                  <div>
                    <label className="radio">
                      <input
                        type="radio"
                        value=""
                        name="room"
                        onChange={this.roomChangHndler}
                      />
                      All
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="1"
                        name="room"
                        onChange={this.roomChangHndler}
                      />
                      Deluxe Room
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="2"
                        name="room"
                        onChange={this.roomChangHndler}
                      />
                      Premium Room
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="3"
                        name="room"
                        onChange={this.roomChangHndler}
                      />
                      Travel Room
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="4"
                        name="room"
                        onChange={this.roomChangHndler}
                      />
                      Semi Delux Room
                    </label>
                  </div>
                </div>
                <hr />
                <div>
                  Cost Filter:
                  <div>
                    <label className="radio">
                      <input
                        type="radio"
                        value="5"
                        name="room"
                        onChange={this.costChangHndler}
                      />
                      All
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="6"
                        name="room"
                        onChange={this.costChangHndler}
                      />
                      Rs 1000 - 3000
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="7"
                        name="room"
                        onChange={this.costChangHndler}
                      />
                      Rs 3001 - 6000
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="8"
                        name="room"
                        onChange={this.costChangHndler}
                      />
                      Rs 6001 - 9000
                    </label>
                    <br />
                    <label className="radio">
                      <input
                        type="radio"
                        value="9"
                        name="room"
                        onChange={this.costChangHndler}
                      />
                      Rs 9001 - 12000
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => this.applyFilterHandler()}
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  applyFilterHandler = () => {
    if (this.state.filter === "" || this.state.filter === "5") {
    } else {
      if (this.state.filter < "5") {
        let rurl = "https://developerfunnel.herokuapp.com/hotellist";
        let roomNumber = this.state.filter;
        let roomurl;
        if (roomNumber === "") {
          roomurl = `${rurl}/${this.props.match.params.id}`;
        } else {
          roomurl = `${rurl}/${this.props.match.params.id}?roomtype=${roomNumber}`;
        }

        fetch(roomurl, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            this.setState({ hotels: data });
          });
      } else {
        let rurl = `https://developerfunnel.herokuapp.com/hotellist/${this.props.match.params.id}`;
        let filterUrl;
        if (this.state.filter === "6") {
          filterUrl = `${rurl}/?hcost=3000&lcost=1000`;
        }
        if (this.state.filter === "7") {
          filterUrl = `${rurl}/?hcost=6000&lcost=3001`;
        }
        if (this.state.filter === "8") {
          filterUrl = `${rurl}/?hcost=9000&lcost=6001`;
        }
        if (this.state.filter === "9") {
          filterUrl = `${rurl}/?hcost=12000&lcost=9001`;
        }
        fetch(filterUrl, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            this.setState({ hotels: data });
          });
      }
    }
  };
  costChangHndler = (event) => {
    this.setState({ filter: event.target.value });
  };
  roomChangHndler = (event) => {
    this.setState({ filter: event.target.value });
  };

  componentDidMount() {
    let newurl = `${url}/${this.props.match.params.id}`;
    fetch(newurl, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          hotels: data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Listing;
