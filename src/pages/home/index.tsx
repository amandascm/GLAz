import React from 'react';
import logo from './logo-dark.svg';
import Navbar from '../../components/Navbar';
import pages from '../../utils/links';
import Button from 'react-bootstrap//Button';

import './styles.css';

function Home() {
  return (
    <div className="Home">
      <Navbar links={pages} />
      <section className="presentation-section">
        <div className="presentation">
          <img src={logo} className="logo" id="GLAz" alt="logo" />
          <h1>A GitHub Languages Analyzer.</h1>
          <div className="presentation-button-div">
            <Button variant="dark">Visualizations</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
