import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
 
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
//  class RegisterForm extends React.Component{
//     render(){
//       return(
//         <div id="loginform">
//           <FormHeader title="Register new account" />
//           <Form />
//         </div>
//       )
//     }
//   }
  
//   const FormHeader = props => (
//       <h2 id="headerTitle">{props.title}</h2>
//   );
  
  
//   const Form = props => (
//      <div>
//        <FormInput description="Username" placeholder="Enter your username" type="text" />
//        <FormInput description="E-mail" placeholder="Enter your e-mail address" type="text" />
//        <FormInput description="Password" placeholder="Enter your password" type="password"/>
//        <FormInput description="Repeat password" placeholder="Re-enter your password" type="password"/>
//        <FormButton title="Create account"/>
//      </div>
//   );
  
//   const FormButton = props => (
//     <div id="button" class="row">
//       <button>{props.title}</button>
//     </div>
//   );
  
//   const FormInput = props => (
//     <div class="row">
//       <label>{props.description}</label>
//       <input type={props.type} placeholder={props.placeholder}/>
//     </div>  
//   );
    return (
        <section id="loginform">
            <h2 id="headerTitle">Aanmelden </h2>
            <form onSubmit={Register}>
            <div class="row">
                <label>Naam</label>
                <input type="text" className="input" placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div class="row">
                <label>Email</label>
                <input type="text" className="input" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>          
            <div class="row">
                <label>Wachtwoord</label>
                <input type="password" className="input" placeholder="******" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="row">
                <label>Bevestig wachtwoord</label>
                <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
            </div>
            <p className="isa_error">{msg}</p>
            <div id="button" class="row">
                <button onSubmit={Register}>Aanmelden</button>
            </div>
            </form>    
        </section>       
    )
}
export default Register