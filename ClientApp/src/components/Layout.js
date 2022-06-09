import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import NavigationBar from './NavigationBar';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return(
    <div>
      <NavigationBar />
      
      <Container>
        {this.props.children}
      </Container>

      <div className='footer'>
        Copyright © 2022 Project D - All rights reserved
      </div>
    </div>
    );
  }
}