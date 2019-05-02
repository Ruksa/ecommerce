import React, { Component } from 'react';

import { Route ,Switch ,Redirect } from 'react-router-dom';
import Movies from './components/movies';
import "./App.css";

import MovieForm from './pages/movieForm';
import Customers from './pages/customers';
import Rentals from './pages/rentals';
import NotFound from './pages/notFound';
import NavBar from './components/navbar';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm';

class MoviesApp extends Component {
   
    render() { 
        return (
        <React.Fragment>
            <NavBar />
            <main className="container">
             <Switch>
             <Route path="/movies/:id"  component={MovieForm} />
                <Route path="/movies"  component={Movies} />
                 <Route path="/customers" component={Customers} />
                 <Route path="/form" component={MovieForm} />
                 <Route path="/rentals" component={Rentals} />
                 <Route path="/login" component={LoginForm} />
                 <Route path="/register" component={RegisterForm} />
                
                 <Route path="/not-found" component={NotFound} />
                 <Redirect from="/"  exact to="/movies" />
                 <Redirect to="/not-found" />
             </Switch>

             </main>
        </React.Fragment>
          );
    }
}
 
export default MoviesApp;