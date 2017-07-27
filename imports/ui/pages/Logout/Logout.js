import React from 'react';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

const Logout = () => (
  <div className="Logout">
    <img
      src="/sunnotes.png"
      alt="sunnotes"
    />
    <h1>Stay safe out there.</h1>
    <p>{'Don\'t forget to checkout Sunnotes\' progress, and follow/contribute to its blog, Medium, and elsewhere on the web:'}</p>
    <ul className="FollowUsElsewhere">
      <li><a href="http://blog.sunnotes.org/">/<strong>S</strong>/</a></li>
      <li><a href="https://medium.com/sunnotes"><i className="fa fa-medium" /></a></li>
    </ul>
  </div>
);

Logout.propTypes = {};

export default Logout;
