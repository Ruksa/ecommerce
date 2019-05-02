import React, { Component } from "react";
import Joi from "joi-browser";
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

  doSubmit = () => {};
  render() {
    const { data, errors } = this.state;
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
