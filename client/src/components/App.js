import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import React, {useState, useEffect} from 'react'
import {Route,Switch} from 'react-router-dom'

export const UserContext = React.createContext()

function App() {

  const [user,setUser]=useState(null)

  useEffect(()=>{
    fetch('/me')
    .then(r=>{
      if (r.ok){
        r.json().then((user)=>setUser(user))
      }
    })
  })

  function handleLogin(user){
    setUser(user)
  }
  return (
    <div>
      <UserContext.Provider value={user}>
       <NavBar />
       <Switch>
          <Route exact path="/login">
            <CreateAccount onLogin={handleLogin}/>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
       </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
