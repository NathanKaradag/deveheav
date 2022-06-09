import React from "react";
import './login.css';

class RegisterForm extends React.Component{
  render(){
    return(
      <div id="loginform">
        <FormHeader title="Register new account" />
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
     <FormInput description="E-mail" placeholder="Enter your e-mail address" type="text" />
     <FormInput description="Password" placeholder="Enter your password" type="password"/>
     <FormInput description="Repeat password" placeholder="Re-enter your password" type="password"/>
     <FormButton title="Create account"/>
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


export default RegisterForm;

