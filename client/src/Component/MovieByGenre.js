import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Stylesheets/moviebygenre.scss';
import ReactStars from 'react-rating-stars-component';
import Tooltip from '@material-ui/core/Tooltip';
function MovieByGenre () {
  const [data, setData] = useState ([]);
  const [generdata, setGenerData] = useState ([]);
  const [movielist, setMovieList] = useState ('Action');
  console.warn ('movielist ', movielist);
  console.log ('specific list', data);
  useEffect (
    () => {
      fetch (`/api/get/genre/${movielist}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then (res => res.json ())
        .then (result => {
          console.log ('==result.data==', result.data);
          // setFeatured (result.posterurl);
          setData (result.data);
        });
    },
    [movielist]
  );

  useEffect (() => {
    fetch (`/api/get/allgenres`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then (res => res.json ())
      .then (result => {
        //console.log ('==result.data==', result.data);
        // setFeatured (result.posterurl);
        setGenerData (result.data);
      });
  }, []);
  //gives all the movies for the Carousel
  const movies = data.map ((item, indx) => {
    return (
      <div style={{height: 500, width: '100%'}} key={indx}>
        <div className="carousel-center">
          <img style={{height: 600}} src={item.posterurl} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i className="fas fa-play" style={{fontSize: 95, color: '#f4c10f'}} />
        </div>
        <div
          className="carousel-caption"
          style={{textAlign: 'center', fontSize: 35}}
        >
          {item.title}
        </div>
      </div>
    );
  });
  // gives all the gener list for display
  const generList = generdata.map ((item, indx) => {
    return (
      <li className="list-inline-item" key={indx} style={{margin: '5px'}}>
        <Tooltip Tooltip title={item + ' Movies'}>
          <button
            type="button"
            className="btn btn-outline-info"
            style={movielist === item ? {backgroundColor: '#5b3769'} : {}}
            onClick={() => {
              setMovieList (item);
            }}
          >
            {item}
          </button>
        </Tooltip>
      </li>
    );
  });

  //this gives the  sorted bundle of movies for display

  const Movielist = data.map ((item, indx) => {
    return (
      <div className=" col-md-3 col-sm-6" key={indx}>
        <div className="card">
          <Link to={`/my-app/allmovies/${item.title}`}>
            <img className="img-fluid" src={item.posterurl} alt={item.title} />

          </Link>
        </div>
        <div className="mt-3">
          <p>{item.title}</p>
          <p style={{fontWeight: 'border'}}>Rating: {item.imdbRating} </p>
          <ReactStars count={item.imdbRating} size={20} color={'#f4c10f'} />
        </div>
      </div>
    );
  });

  return (
    <div className="containerr">
      <h5 className=" text-center">What are you looking for </h5>
      <div className="row mt-3" style={{paddingLeft: '41px'}}>
        <div className="col">
          <ul className="list-inline">
            {generList}
          </ul>

        </div>
      </div>
      <h5 className=" text-center">{movielist} Movies</h5>
      <div className="row mt-3 ">

        {Movielist}
      </div>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{color: '#Sa606b'}}>
            TRENDING PERSONS
          </p>
        </div>
      </div>
      <div className="row mt-3">
        {/* actors photo will not get visible right now */}
        {data.actors}
      </div>
    </div>
  );
}
{
  /* <div className="row">
<div className="col">
  {/* <RBCarousel
    autoplay={true}
    pauseOnVisiblity={true}
    slidesshowSpeed={5000}
    version={4}
    indicators={true}
  >
    {movies}
  </RBCarousel> */
}
//</div>
//</div> */}

export default MovieByGenre;
