import {NavLink} from 'react-router-dom'

function NavBar() {
    return <div>
      <NavLink
         to="login"
         exact
      >
       Login
      </NavLink>

      <NavLink
        to="home"
        exact
      >
        Home
      </NavLink>
      </div>
  }
  
  export default NavBar;