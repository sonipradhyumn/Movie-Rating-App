import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch, Link} from 'react-router-dom';
import '../Stylesheets/homepage.scss';

let allclips = [
  '/movie/marvel.mp4',
  '/movie/pessange.mp4',
  '/movie/got.mp4',
  '/movie/abcd.mp4',
];

function HomePage () {
  return (
    <div className="parent">
      <video
        style={{widht: '100%', height: '100vh', opacity: '0.4'}}
        src={allclips[0]}
        autoPlay
        loop
        muted
      />
      <div className="container">

        <div className="card">
          <span />
          <span />
          <span />
          <span />
          <div className="content">
            <h2>01</h2>
            <h3> All Movies </h3>
            <p>Check out all movies ratings </p>
            <Link to="/my-app/allmovies">Click here </Link>
          </div>
        </div>
        <div className="card">
          <span />
          <span />
          <span />
          <span />
          <div className="content">
            <h2> 02</h2>
            <h3> Movie by Categories </h3>
            <p>Check out movies by gener</p>
            <Link to="/my-app/genre"> click Here</Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default HomePage;
