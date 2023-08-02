import {NavLink} from 'react-router-dom'

function NavBar({handleLogout}) {
    return <div>

      <NavLink
        to="/"
        exact
      >
        Home
      </NavLink>
      <NavLink
        to="prizes"
        exact
      >
        Prizes
      </NavLink>
      <NavLink
        to="chores"
        exact
      >
        Chores
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
      </div>
  }
  
  export default NavBar;