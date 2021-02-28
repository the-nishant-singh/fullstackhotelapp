import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./Layout/footer";
import Header from "./Layout/header";
import Home from "./home/home";
import Profile from "./users/profile";
import Booking from "./users/booking";
import Listing from "./Listing/listing";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list/:id" component={Listing} />
        <Route path="/bookings" component={Booking} />
        <Route path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
