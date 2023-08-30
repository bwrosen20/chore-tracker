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
      <div className="NavBar">
 
      <div className="Intro">
        {user ? <h3>Hi {user.username}!</h3> : null}
      </div>
      

      <div className="Navigation" >
        <ul className="NavLinks" >
          <li>
            <NavLink
            className="NavOption"
            to="/"
            exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
            className="NavOption"
            to="prizes"
            exact>
              Prizes
            </NavLink>
          </li>
          <li>
            <NavLink
            className="NavOption"
            to="chores"
            exact>
              {user.admin ? "Single Chores" : "Chores"}
            </NavLink>
          </li>
          {user.admin? 
          <li>
            <NavLink
            className="NavOption"
            to="repeat"
            exact>
              Repeat Chores
            </NavLink>
          </li>:null
          }<li>
            <NavLink
            className="NavOption"
            to="users"
            exact>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <a className="LogoutButton" onClick={handleLogout}>Logout</a>
      <div className="NavBars" class="NavBars" onClick={toggleClass}>
      <i className={isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
      </div>
      </div>
      <div className={isOpen ? "dropdownMenu open" : "dropdownMenu"} class={isOpen ? "dropdownMenu open" : "dropdownMenu"} onClick={toggleClass}>
          <li>
            <NavLink
            className="NavOption"
            to="/"
            exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
            className="NavOption"
            to="prizes"
            exact>
              Prizes
            </NavLink>
          </li>
          <li>
            <NavLink
            className="NavOption"
            to="chores"
            exact>
              {user.admin ? "Single Chores" : "Chores"}
            </NavLink>
          </li>
          {user.admin? 
          <li>
            <NavLink
            className="NavOption"
            to="repeat"
            exact>
              Repeat Chores
            </NavLink>
          </li>:null
          }<li>
            <NavLink
            className="NavOption"
            to="users"
            exact>
              Users
            </NavLink>
          </li>
          <li><a className="LogoutButton" onClick={handleLogout}>Logout</a></li>
      </div>
      </header>
  }
  
  export default NavBar;