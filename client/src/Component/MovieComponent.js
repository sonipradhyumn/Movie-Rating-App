import React from 'react';
import {Link} from 'react-router-dom';
import MovieDetails from './MovieDetails';
import ReactStars from 'react-rating-stars-component';
import Tooltip from '@material-ui/core/Tooltip';

function on () {
  //console.log (title);
  // <Link to={`/my-app/allmovies/$`}
}
const MovieComponent = ({imdbRating, posterurl, title, year, storyline}) => {
  return (
    <Tooltip Tooltip title={title}>
      <div className="movie" onClick={on}>

        <Link to={`/my-app/allmovies/${title}`} style={{color: 'white'}}>
          <div className="movie-header">
            <img src={posterurl} alt={title} style={{minWidth: '100%'}} />
          </div>
          <div className="movie-info">
            <h5 className="text-center">{title}</h5>
          </div>
          <div className="movie-over">
            <h2>Storyline</h2>
            <span>Rating: {imdbRating}</span>
            <ReactStars count={imdbRating} size={20} color={'#f4c10f'} />
            <p>{storyline}</p>
          </div>
        </Link>
      </div>
    </Tooltip>
  );
};

export default MovieComponent;
