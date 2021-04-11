const express = require ('express');
const dotenv = require ('dotenv');
//routes file
const routes = require ('./routes/routes');
dotenv.config ({path: './config.env'});
const app = express ();
//to bring data
app.use (express.json ());
// mount  file
app.use ('/api/get', routes);
const PORT = process.env.PORT || 5000;
const server = app.listen (
  PORT,
  console.log (
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
  )
  //for checking  server -  http://localhost:5000/api/get/all
  
  // POSTMAN LINK - http://localhost:5000/api/get/all
);
//handel unhendle rejectiojn
process.on ('unhandledRejection', (err, promise) => {
  console.log (`ERROR:${err.message}`);
  //close server & exit process
  server.close (() => process.exit (1));
});
