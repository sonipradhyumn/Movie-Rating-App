import React, {useState, useEffect, Fragment} from 'react';
import '../Stylesheets/movie-detail.scss';
import ReactPlayer from 'react-player';
import '../Stylesheets/moviebygenre.scss';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Tooltip from '@material-ui/core/Tooltip';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function MovieDetails (props) {
  const [suggestion, setSuggestion] = useState ([]);
  const [feedback, setFeedback] = useState (null);
  const [like, setLike] = useState (null);
  const [rating, setRating] = useState ('0');
  const [movielist, setMovieList] = useState ('Action');
  // console.log ('like----', rating);
  const [dislike, setDislike] = useState ('');
  let genre = [];
  let movie = props.match.params.detail;
  const [data, setData] = useState ([]);
  // console.warn ('suggestion-', suggestion);
  console.log ('You are on the  movie detail tab');

  //****** SET SUGGESTION MOVIE LIST ON UI  **********
  const Movielist = suggestion.map ((item, indx) => {
    return (
      <div className=" col-md-3 col-sm-6" key={indx}>
        <div className="card box">
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

  //****** FETCH SUGGESTION MOVIE LIST  **********
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
          setSuggestion (result.data);
        });
    },
    [movielist]
  );
  //****** FETCH PERTICULAR MOVIE DETAIL**********
  useEffect (
    () => {
      //3:14-7/2/21
      fetch (`/api/get/movie/${movie}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then (res => res.json ())
        .then (result => {
          //  console.log ('==result.data==', result.data);
          setData (result.data);
          setFeedback ('');
          setLike (result.data[0].like);
          setDislike (result.data[0].dislike);
          setRating (result.data[0].imdbRating);
        });
    },
    [movie]
  );

  //****** UPDATE PERTICULAR MOVIE REVIEW**********
  useEffect (
    () => {
      fetch (`/api/get/rating/${movie}.`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify ({
          imdbRating: rating,
        }),
      })
        .then (res => res.json ())
        .then (result => {});
    },
    [rating]
  );

  //****** UPDATE LIKE/DISLIKE OF PERTICULAR MOVIE **********
  useEffect (
    () => {
      fetch (`/api/get/feedback/${movie}/${feedback}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // body: JSON.stringify ({
        //   prevfeel:
        // }),
      })
        .then (res => res.json ())
        .then (result => {
          console.log ('==result.data DS==', result.data[0].like);
          // setFeatured (result.posterurl);
          if (feedback === 'like') {
            setLike (result.data[0].like);
          }
          if (feedback === 'dislike') {
          }
          setDislike (result.data[0].dislike);
        });
    },
    [feedback]
  );

  //****** SHOW UI OF CLICKED MOVIE WITH DETAIL**********
  const Movie = data.map ((item, indx) => {
    //generate actor detail
    let actor = item.actors.map (a => {
      return <Fragment>{' '}{a}{' ,'}</Fragment>;
    });
    //generate movie genre of clicked movie
    let moviegenre = item.genres.map (i => {
      return <Fragment>{' '}{i}{' ,'}</Fragment>;
    });

    //****** SHOW PERTICULAR GENRE list **********
    genre = item.genres.map (i => {
      return (
        <Fragment>
          <Tooltip Tooltip title={i + ' Movies'}>
            <li
              className="list-inline-item "
              key={indx}
              style={{margin: '5px'}}
            >
              {' '}<button
                type="button"
                className="btn btn-outline-info"
                style={movielist === i ? {backgroundColor: '#5b3769'} : {}}
                onClick={() => {
                  setMovieList (i);
                }}
              >
                {i}
              </button>{' '}
            </li>
          </Tooltip>
        </Fragment>
      );
    });

    //****** SHOW MOVIE TRAILER VIDEO AND MOVIE DETAIL**********
    return (
      <div className="Movie" key={indx}>
        <h4 className="text-center">{item.title}</h4>
        <div className="movie_detail">
          {/* <ReactPlayer url={item.trailer} style={{'margin-left': '25vw'}}/> */}
          <div>
            <ReactPlayer className="player" url={item.trailer} />
            Give your feedback
            <div className="text-left ">
              {/* <h6>Your view</h6> */}
              <Tooltip Tooltip title="Like" placement={'top'}>
                <span
                  className="material-icons feel"
                  style={feedback === 'like' ? {color: '#5b3769'} : {color: ''}}
                  onClick={() => {
                    setFeedback ('like');
                  }}
                >
                  thumb_up

                </span>
              </Tooltip>
              <Tooltip Tooltip title="Dislike" placement={'top'}>
                <span
                  className="material-icons feel"
                  style={
                    feedback === 'dislike' ? {color: '#5b3769'} : {color: ''}
                  }
                  onClick={() => {
                    setFeedback ('dislike');
                  }}
                >
                  thumb_down
                </span>
              </Tooltip>
              <span className=" text-left d-flex">

                <span
                  style={{
                    height: '20px',
                    width: '50px',
                    paddingRight: '5px',
                  }}
                >
                  {like}
                </span>
                <span style={{height: '20px', width: '50px'}}>{dislike}</span>
              </span>
            </div>
          </div>
          <div className="detail">
            <div className="row ">
              <div className="col text-center text"><h6>Movie Details</h6></div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Imdb Rating:</div>
              <div className="col">
                {rating}
              </div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Your rating:</div>
              <div className="col">
                <ReactStars
                  count={10}
                  onChange={i => setRating (i)}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  fullIcon={<i className="fa fa-star" />}
                  activeColor="#5b3769"
                />

              </div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Year of release:</div>
              <div className="col">{item.year}</div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Content Rating:</div>
              <div className="col">{item.contentRating}</div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Release Date:</div>
              <div className="col">{item.releaseDate}</div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Actors:</div>
              <div className="col">{actor}</div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text">Genres:</div>
              <div className="col"> {moviegenre}</div>
            </div>
            <div className="row">
              <div className="col-3" />
              <div className="col text" style={{top: '10vh'}}>
                {' '} <div className="icon" />
              </div>
              <div className="col" style={{top: '10vh'}}> </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  //****** MAIN DIV OF MOVIE DETAIL AND SUDGESTION LIST**********
  return (
    <div style={{width: '100vw', justifyContent: 'center'}}>
      <div className="">
        {Movie}
      </div>
      <div className="d-flex middle">
        <h3>SUGGESTIONS</h3> <ul className="list-inline">
          {genre}
          <Link to={`/my-app/genre`}>
            <Tooltip Tooltip title="Go to category list">
              <li className="list-inline-item " style={{margin: '5px'}}>
                <button type="button" className="btn btn-outline-info">
                  More
                </button>{' '}
              </li>
            </Tooltip>
          </Link>
        </ul>
      </div>
      <div className="d-flex movielist middle">
        {Movielist}
      </div>
    </div>
  );
}

export default MovieDetails;
