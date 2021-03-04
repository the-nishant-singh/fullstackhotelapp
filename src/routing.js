import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Layout/header";
import Home from "./home/home";
import Profile from "./users/profile";
import Booking from "./bookings/viewbookings";
import Listing from "./Listing/listing";
import Details from "./details/details";
import Login from "./users/login";
import Register from "./users/register";
import BookTicket from "./users/addbooking";
import Admin from "./Admin/admin";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list/:id" component={Listing} />
        <Route path="/details/:id" component={Details} />
        <Route path="/bookings" component={Booking} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/bookticket/:id" component={BookTicket} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
