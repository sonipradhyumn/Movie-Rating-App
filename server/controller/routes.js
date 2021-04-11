const INFO = require ('../models/dummyData');

// POSTMAN LINK - http://localhost:5000/api/get/all


//get all movies list for Allmovies Page  
//route         /api/get/all
exports.getroutes = async (req, res, next) => {
  try {
    const info = await INFO;
    res.status (200).json ({
      success: true,
      data: info.data,
    });
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//get specific movie list  for Allmovies component  Page
//route        /api/get/movie/:title
exports.getRouteByTitle = async (req, res) => {
  try {
    const info = await INFO.data.filter (movielist => {
      if (movielist.title === req.params.title) {
        return movielist;
      }
    });
    res.status (200).json ({success: true, data: info});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//get all genre list for  MovieByGenre  Page 
//route        /api/get/genre/:genre
exports.getRoutesByGenre = async (req, res) => {
  try {
    let list = [];
    INFO.data.filter (movielist => {
      movielist.genres.filter (q => {
        if (q === req.params.genre) {
          list.push (movielist);
        }
      });
    });
    res.status (200).json ({success: true, data: list});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//get all same genre movies list for MoviesByGener  Page 
//route        /api/get/allgenres
exports.getRoutesByGenrelist = async (req, res) => {
  try {
    let list = [];
    INFO.data.filter (movielist => {
      movielist.genres.filter (q => {
        // res.send (q);
        if (!list.includes ('' + q)) {
          list.push (q);
        }
      });
    });
    res.status (200).json ({success: true, data: list});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//update  routes
//put like on triler for MovieDetail Page  

//route        /api/get/feedback/:movie/like


exports.putLikeOnTrailer = async (req, res, next) => {
  try {
    let temp = INFO.data;
    const info = await temp.filter (movielist => {
      if (movielist.title === req.params.movie) {
        // if (req.body.prevfeel == 'dislike') {
        //   movielist.like = ++movielist.like;
        //   movielist.dislike = --movielist.dislike;
        // } else {
          movielist.like = ++movielist.like;
        // }
        return movielist;
      }
    });
    res.status (200).json ({success: true, data: info});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//put dislikelike on triler for MovieDetail Page 

//                 /api/get/feedback/:movie/dislike
exports.putDislikeOnTrailer = async (req, res, next) => {
  try {
    let temp = [...INFO.data];
    const info = await temp.filter (movielist => {
      if (movielist.title === req.params.movie) {
        // if (req.body.prevfeel === 'like') {
        //   movielist.dislike = ++movielist.dislike;
        //   movielist.like = --movielist.like;
        // } else {
          movielist.dislike = ++movielist.dislike;
        // }

        return movielist;
      }
    });
    res.status (200).json ({success: true, data: info});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};

//update rating on triler for MovieDetail Page

//                    /api/get/rating/:movie
exports.UpdateRatingOfMovie = async (req, res, next) => {
  try {
    let temp = [...INFO.data];
    const info = await temp.filter (movielist => {
      if (movielist.title === req.params.movie) {
        // if (req.body.prevfeel === 'like') {
        //   movielist.dislike = ++movielist.dislike;
        //   movielist.like = --movielist.like;
        // } else {
          movielist.imdbRating = req.body.imdbRating;
        // }

        return movielist;
      }
    });
    res.status (200).json ({success: true, data: info});
  } catch (error) {
    res.status (400).json ({success: false});
  }
};
