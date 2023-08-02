import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import ChorePage from './ChorePage'
import PrizePage from './PrizePage'
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
    fetch('/users')
          .then(r=>{
              r.json().then((users=>console.log(users)))
          })
  },[])

  if (!user) return <CreateAccount onLogin={handleLogin} />

  function handleLogin(user){
    setUser(user)
  }

  function handleLogout(){
    fetch('/logout',{method:"DELETE"}).then((r)=>{
      if (r.ok){
        setUser(null)
      }
    })
  }
  return (
    <div>
      <UserContext.Provider value={user}>
       <NavBar handleLogout={handleLogout}/>
       <Switch>
          <Route exact path="/login">
            <CreateAccount onLogin={handleLogin}/>
          </Route>
          <Route exact path="/chores">
            <ChorePage />
          </Route>
          <Route exact path="/prizes">
            <PrizePage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
       </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
