import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { SelfBindingComponent } from '../support';


export default class extends SelfBindingComponent {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <a href="/">
            <Navbar.Brand>Chromecast</Navbar.Brand>
          </a>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="config">
            <NavItem>Configure</NavItem>
          </LinkContainer>
          <LinkContainer to="launch">
            <NavItem>Launch</NavItem>
          </LinkContainer>
          <LinkContainer to="play">
            <NavItem>Play</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
