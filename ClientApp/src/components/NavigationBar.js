import React from "react";
import './random.css'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";


class NavigationBar extends React.Component {
    changestate = (event) => {
        const x = document.getElementsByClassName("menu-icon");
    }

    realchangestate = (e) => {
        const x = document.getElementsByClassName("menu-icon");
        x[0].checked = false;
    }

    Logout = (e) => {
        try {
            axios.delete('http://localhost:5000/logout');
            useHistory().push("/");
        } catch (error) {
            console.log(error);
        }
    }
    render () {
        return(
            <div>
                
                <input class="menu-icon" type="checkbox" onClick={(e) => this.changestate(e)} id="menu-icon" name="menu-icon"/>
                <label for="menu-icon"></label>
                <nav class="nav"> 		
                    <ul class="pt-5">
                        <li><NavLink onClick={() => this.realchangestate()} tag={Link} to="/">Home</NavLink></li>
                        <li><NavLink onClick={() => this.realchangestate()} tag={Link} to="/editor">Code Editor</NavLink></li>
                        <li><NavLink onClick={() => this.realchangestate()} tag={Link} to="/fetch-data">Data</NavLink></li>
                        <li><NavLink onClick={() => this.realchangestate()} tag={Link} to="/login">Inloggen</NavLink></li>
                        <li><NavLink onClick={() => this.Logout()} tag={Link} to="/">Uitloggen</NavLink></li>
                    </ul>
                </nav>

                
            </div>
        )
    }
}

export default NavigationBar;