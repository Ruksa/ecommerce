import React, { Component } from "react";

import Joi from "joi-browser";
import * as userService from '../services/userService';
import auth from '../services/authService';
import Form from "../components/common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
    .required()
      .email()
      .label("Username"),
    password: Joi.string()
    .required()
      .min(5)
    
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
   
    try
    {
      const response=await userService.register(this.state.data);
      
      auth.loginWithJwt(response.headers["x-auth-token"]);
   window.location="/";
    }
    catch(ex){
      console.log("ex.response.status"+ex.response.status);

      if(ex.response && ex.response.status===400) 
      {
        const errors={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({ errors });
      }
    }
    
  };
  render() {
   
    return (
      <div>
        <h1>RegisterForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
