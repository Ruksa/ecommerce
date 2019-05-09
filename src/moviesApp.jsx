import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import { ToastContainer } from "react-toastify";
import MovieForm from "./pages/movieForm";
import Customers from "./pages/customers";
import Rentals from "./pages/rentals";
import NotFound from "./pages/notFound";
import NavBar from "./components/navbar";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";
import LogOut from "./components/logout";
import ProtectedRoute from './components/common/protectedRoute';
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


class MoviesApp extends Component {
  state = {};

  componentDidMount() {
   const user=auth.getCurrentUser();
   this.setState({user});
  }

  render() {
      const {user}=this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
             path="/movies/:id" 
             component={MovieForm}
             />
            
            <Route path="/movies" 
             render={props=><Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/form" component={MovieForm} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default MoviesApp;
