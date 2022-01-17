import {NavLink} from 'react-router-dom';

function Navbar(){
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/policy">Policy</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/visualize">Visualize</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}

export default Navbar;