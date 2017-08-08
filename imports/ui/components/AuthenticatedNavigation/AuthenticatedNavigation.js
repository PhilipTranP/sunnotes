import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const AuthenticatedNavigation = ({ name }) => (
  <div>

    <Nav>
      <LinkContainer to="/book-service/search">
        <NavItem eventKey={1} href="/book-service/search">Books</NavItem>
      </LinkContainer>
    </Nav>
  {/*
   <Nav>
      <LinkContainer to="/documents/new">
        <NavItem eventKey={1.1} href="/documents/new">Add New</NavItem>
      </LinkContainer>
    </Nav>
   */}
    <Nav pullRight>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <LinkContainer to="/my-books">
          <NavItem eventKey={2.2} href="/my-books">My Books</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => Meteor.logout()}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
