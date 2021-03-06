import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <div>
    <Nav>

          <NavItem eventKey={1}>Book Personal Assistant</NavItem>

    </Nav>

    <Nav pullRight>
      <LinkContainer to="/signup">
        <NavItem eventKey={1} href="/signup">Sign Up</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem eventKey={2} href="/login">Log In</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);

export default PublicNavigation;
