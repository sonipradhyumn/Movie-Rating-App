import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
import MovieComponent from './MovieComponent';
import '../Stylesheets/allmovies.scss';

const AllMovies = () => {
  //console.log ('==result.data==');
  const [data, setData] = useState ([]);
  console.log ('You are on the All movie list tab');
  //console.log (data);

  useEffect (() => {
    //3:14-7/2/21
    fetch ('/api/get/all', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then (res => res.json ())
      .then (result => {
        // console.log ('==result.data==', result.data);
        setData (result.data);
      });
  }, []);

  return (
    <div className="movie-container">
      {data.length > 0 &&
        data.map (movie => <MovieComponent key={movie.id} {...movie} />)}
    </div>
  );
};

export default AllMovies;
