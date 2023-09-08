import {NavLink} from 'react-router-dom'
import {useContext, useState} from 'react'
import {UserContext} from './App'

function NavBar({handleLogout}) {

    const user = useContext(UserContext)
    const [isOpen,setIsOpen] = useState(false)


    function toggleClass(){
      setIsOpen(!isOpen)
    }

    return <header>
      <div className="navBar">
 
      <div className="intro">
        {user ? <h3>Hi {user.username}!</h3> : null}
      </div>
      

      <div className="navigation" >
        <ul className="navLinks" >
          <li>
            <NavLink
            className="navOption"
            to="/"
            exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
            className="navOption"
            to="prizes"
            exact>
              Prizes
            </NavLink>
          </li>
          <li>
            <NavLink
            className="navOption"
            to="chores"
            exact>
              {user.admin ? "Single Chores" : "Chores"}
            </NavLink>
          </li>
          {user.admin? 
          <li>
            <NavLink
            className="navOption"
            to="repeat"
            exact>
              Repeat Chores
            </NavLink>
          </li>:null
          }<li>
            <NavLink
            className="navOption"
            to="users"
            exact>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <a className="logoutButton" onClick={handleLogout}>Logout</a>
      <div class="navBars" onClick={toggleClass}>
      <i className={isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
      </div>
      </div>
      <div className={isOpen ? "dropdownMenu open" : "dropdownMenu"} class={isOpen ? "dropdownMenu open" : "dropdownMenu"} onClick={toggleClass}>
          <li>
            <NavLink
            className="navOption"
            to="/"
            exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
            className="navOption"
            to="prizes"
            exact>
              Prizes
            </NavLink>
          </li>
          <li>
            <NavLink
            className="navOption"
            to="chores"
            exact>
              {user.admin ? "Single Chores" : "Chores"}
            </NavLink>
          </li>
          {user.admin? 
          <li>
            <NavLink
            className="navOption"
            to="repeat"
            exact>
              Repeat Chores
            </NavLink>
          </li>:null
          }<li>
            <NavLink
            className="navOption"
            to="users"
            exact>
              Users
            </NavLink>
          </li>
          <li><a className="logoutButton" onClick={handleLogout}>Logout</a></li>
      </div>
      </header>
  }
  
  export default NavBar;