import React, {useState} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
// IMPORTING FIRST COMPONENT
import Homepage from './Component/HomePage';
import SplashScreen from './Component/SplashScreen';
import './Stylesheets/app.scss';
import {Switch} from 'react-router-dom';
import AllMovies from './Component/AllMovies';
import Nav from './Component/NavBar';
import MovieDetails from './Component/MovieDetails';
import MovieByGenre from './Component/MovieByGenre';

function App () {
  const [splashScreen, setsplashScreen] = useState (true);
  function loading () {
    setTimeout (function () {
      setsplashScreen (false);
    }, 5000);
  }
  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/Movie-Rating-App" render={() => { return <Redirect to="/my-app" /> }}/>
        <Route exact path="/my-app" component={Homepage} />
        <Route exact path="/my-app/genre" component={MovieByGenre} />
        <Route exact path="/my-app/allmovies/" component={AllMovies} />
        <Route exact path="/my-app/allmovies/:detail" component={MovieDetails} />
      </Switch>
    );
  };
  loading ();

  return (
    <>
      {splashScreen
        ? <SplashScreen />
        : <BrowserRouter>
            <Nav />
            <Routing />
          </BrowserRouter>}
    </>
  );
}

export default App;
