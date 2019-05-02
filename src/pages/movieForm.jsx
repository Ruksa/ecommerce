import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import {  getGenres } from '../services/fakeGenreService';

import {getMovie, saveMovie } from './../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: { title: "", 
            genreId: "", 
            numberInStock: "", 
            dailyRentalRate: "" 
          },
    errors: {},
    genres:[]
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
      genreId: Joi.string()
      .required()
      .label("Genre"),
      numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in stock"),
      dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  mapToViewModel = movie=>{
    return {
      _id:movie._id,
      title:movie.title,
      genreId:movie.genre._id,
      numberInStock:movie.numberInStock,
      dailyRentalRate:movie.dailyRentalRate
    };

  }
 
  componentDidMount(){
    const genres= getGenres();
    this.setState({genres});

    const movieId=this.props.match.params.id;

    if(movieId==="new") return;

    const movie=getMovie(movieId);

    if(!movie) return this.props.history.push('/not-found');

    this.setState({data:this.mapToViewModel(movie)})

 }

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre",this.state.genres)}    
          {this.renderInput("numberInStock", "Number in Stock","number")}     
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
