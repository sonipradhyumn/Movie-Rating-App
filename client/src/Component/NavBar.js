import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../Stylesheets/navbar.scss';
import Tooltip from '@material-ui/core/Tooltip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavBar = () => {
  const history = useHistory ();
  const [click, setClick] = useState (false);
  //const [closeMobileMenu, setCloseMobileMenu] = useState (false);
  //here handleclick will set click as opposite (for eg ture -> false )
  const handleClick = () => setClick (!click);
  const closeMobileMenu = () => setClick (false);

  function ullist () {
    return (
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <Tooltip Tooltip title="Home page">
          <li className="nav-item">
            <Link to="/my-app" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
        </Tooltip>
        <Tooltip Tooltip title="All Movies">
          <li className="nav-item">
            <Link to="/my-app/allmovies" onClick={closeMobileMenu}>
              All Movies
            </Link>
          </li>
        </Tooltip>
        <Tooltip Tooltip title="Movie by category">
          <li className="nav-item">
            <Link to="/my-app/genre" onClick={closeMobileMenu}>Genre</Link>
          </li>
        </Tooltip>
      </ul>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        {ullist ()}
      </div>
      <Tooltip Tooltip title="User">
        <div className="icon">
          <span className="material-icons">
            perm_identity
          </span>
        </div>
      </Tooltip>

    </nav>
  );
};
export default NavBar;
