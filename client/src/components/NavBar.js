import {NavLink} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from './App'

function NavBar({handleLogout}) {

    const user = useContext(UserContext)

    return <div>

      {user ? <h3>Hi {user.username}!</h3> : null}

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