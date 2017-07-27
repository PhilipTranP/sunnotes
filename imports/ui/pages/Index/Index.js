import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <img
      src="/sunnotes.png"
      alt="Sunnotes"
      style={{width: "200px"}}
    />
  <h1>/<strong>S</strong>/ sunnotes.org</h1>
    <p>Helps tutors and students save <i className="fa fa-clock-o" /> {' '} <i className="fa fa-usd" /> on books.</p>
    <div>
      <Button href="#"><i className="fa fa-slack" /> Join Sunnotes Slack Channel</Button>
    </div>
    <footer>
      <p>{'Don\'t forget to checkout Sunnotes\' progress, and follow/contribute to its blog, Medium, and elsewhere on the web:'} <a href="http://blog.sunnotes.org/"><i className="fa fa-medium" /></a> <a href="http://blog.sunnotes.org/" style={{textDecoration: 'none'}}>/<strong>S</strong>/</a></p>
    </footer>
  </div>
);

export default Index;
