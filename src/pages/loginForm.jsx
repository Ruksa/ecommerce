import React, { Component } from "react";
import Joi from "joi-browser";
import Form from '../components/common/form';
import Input from "../components/common/input";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  
  

 doSubmit = () => {

 }
  
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
         
         {this.renderInput("username","Username")}

         {this.renderInput("password","Password","password")}
            {this.renderButton('Login')}
          
        </form>
      </div>
    );
  }
}

export default LoginForm;
