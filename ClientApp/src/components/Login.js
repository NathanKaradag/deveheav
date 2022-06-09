import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './login.css';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/dashboard");
        } catch (error) {
            return setMsg("Invalid login");
        }
    }
        return (
            <section id="loginform">
                <h2 id="headerTitle">Inloggen </h2>
                <form onSubmit={Auth}>
                <div class="row">
                    <label>Email</label>
                    <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="row">
                    <label>Wachtwoord</label>
                    <input type="Wachtwoord" className="input" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="button" class="row">
                    <button onSubmit={Auth}>Inloggen</button>
                </div>
                <p className="isa_error">{msg}</p>
                </form>
                <li className="noaccount"><NavLink tag={Link} to="/register">Heb je geen account? Creëer er een</NavLink></li>
            </section>
        )
}
 
export default Login