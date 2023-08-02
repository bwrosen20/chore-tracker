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
  const [users,setUsers]=useState([])

  useEffect(()=>{
    fetch('/me')
    .then(r=>{
      if (r.ok){
        r.json().then((data)=>{
          setUser(data[0])
          setUsers(data.slice(1))
        })
      }
    })
    
  },[])

  if (!user) return <CreateAccount onLogin={handleLogin} />

  function handleLogin(data,email){

    setUser(data.find((member)=>(email.toString()===(member.email.toString()))))
    setUsers(data)
    
  }

  function handleLogout(){
    fetch('/logout',{method:"DELETE"}).then((r)=>{
      if (r.ok){
        setUser(null)
      }
    })
  }


  console.log(users)
  return (
    <div>
      <UserContext.Provider value={user}>
       <NavBar handleLogout={handleLogout}/>
       <Switch>
          <Route exact path="/login">
            <CreateAccount onLogin={handleLogin}/>
          </Route>
          <Route exact path="/chores">
            <ChorePage users={users}/>
          </Route>
          <Route exact path="/prizes">
            <PrizePage users={users}/>
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
