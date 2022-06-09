import React from "react";
import './login.css';
import RegisterForm from "./RegisterForm";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
      </div>
    )
  }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Username" placeholder="Enter your username" type="text" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormButton title="Log in"/>
     <li className="noaccount"><NavLink tag={Link} to="/register">Dont have an account? Create one</NavLink></li>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);


export default LoginForm;

