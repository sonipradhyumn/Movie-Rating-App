const express = require ('express');
// POSTMAN LINK - http://localhost:5000/api/get/all

const {
  getroutes,
  getRouteByTitle,
  getRoutesByGenre,
  getRoutesByGenrelist,
  putLikeOnTrailer,
  putDislikeOnTrailer,
  UpdateRatingOfMovie,
  // createroute,
  // updateroute,
  // deleteroute,
} = require ('../controller/routes');
const router = express.Router ();
/*  //initial routes but now we have created  using controller methods
router.get('/',(req,res)=>{res.status(200).json({success:true,msg:'show all files'})});
router.get('/:id',(req,res)=>{});
router.post('/',(req,res)=>{});
router.put('/:id',(req,res)=>{});
router.delete('/:id',(req,res)=>{});
*/
router.route ('/all').get (getroutes); //.post (createroute);
router.route ('/movie/:title').get (getRouteByTitle); //.put (updateroute).delete (deleteroute);
router.route ('/genre/:genre').get (getRoutesByGenre);
router.route ('/allgenres').get (getRoutesByGenrelist);
router.route ('/feedback/:movie/like').put (putLikeOnTrailer);
router.route ('/feedback/:movie/dislike').put (putDislikeOnTrailer);
router.route ('/rating/:movie').put (UpdateRatingOfMovie);

module.exports = router;
