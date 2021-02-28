import React from "react";
import "./listing.css";
import Loader from "../../public/loader.svg";
const url = "https://developerfunnel.herokuapp.com/hotellist";

class Listing extends React.Component {
  constructor() {
    super();
    this.state = {
      hotels: ""
    };
  }

  renderHotels() {
    console.log(this.state.hotels);
    if (this.state.hotels) {
      return this.state.hotels.map((item) => {
        return (
          <div
            className="card"
            style={{ margin: "auto", width: "100%", marginTop: "20px" }}
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
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <center>
          <img src={Loader} />
        </center>
      );
    }
  }

  render() {
    return (
      <>
        <center>
          <h1>I am the listing page</h1>
        </center>
        <div className="row">
          <div className="col1">Filers</div>
          <div className="col2">{this.renderHotels()}</div>
        </div>
      </>
    );
  }

  componentDidMount() {
    newurl = `${url}/${this.props.match.params.id}`;
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
