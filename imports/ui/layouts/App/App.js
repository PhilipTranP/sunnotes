import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
// import Documents from '../../pages/Documents/Documents';
import NewJacket from '../../pages/NewDocument/NewJacket';
import NewBook from '../../pages/NewDocument/NewBook';
import NewLibrary from '../../pages/NewDocument/NewLibrary';

import BookHome from '../../pages/MyBooks/BookHome'
import SearchBook from '../../pages/MyBooks/SearchBook'
import Requests from '../../pages/MyBooks/Requests'
import Available from '../../pages/MyBooks/Available'


import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
      <Navigation {...props} />
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Authenticated exact path="/my-books" component={BookHome} {...props} />
          {/*<Authenticated exact path="/documents" component={Documents} {...props} />
          <Authenticated exact path="/book-service/search" component={SearchBook} {...props} /> */}

          <Authenticated exact path="/available" component={Available} {...props} />
          <Authenticated exact path="/my-book/search" component={SearchBook} {...props} />
          <Authenticated exact path="/requests" component={Requests} {...props} />
          <Authenticated exact path="/documents/new" component={NewJacket} {...props} />
          <Authenticated exact path="/documents/new/book-info" component={NewBook} {...props} />
          <Authenticated exact path="/documents/new/:_id" component={NewLibrary} {...props} />
          <Authenticated exact path="/documents/:_id" component={ViewDocument} {...props} />
          <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...props} />
          <Authenticated exact path="/profile" component={Profile} {...props} />
          <Public path="/book-service/search" component={SearchBook} {...props} />
          <Public path="/signup" component={Signup} {...props} />
          <Public path="/login" component={Login} {...props} />
          <Public path="/logout" component={Logout} {...props} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          <Route name="terms" path="/terms" component={Terms} />
          <Route name="privacy" path="/privacy" component={Privacy} />
          <Route name="examplePage" path="/example-page" component={ExamplePage} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </div> : ''}
  </Router>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
