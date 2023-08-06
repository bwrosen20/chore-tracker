import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import ChorePage from './ChorePage'
import PrizePage from './PrizePage'
import UsersPage from './UsersPage'
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

  function handleEditPrize(data){
    setUsers(users.map((member)=>{
    return {...member,prizes:member.prizes.map((prize)=>(prize.id===data.id ? data : prize))}
    }))
    setUser(users.find((member)=>{return member.admin}))
  }

  function handleNewPrize(data){
    setUsers(users.map((member)=>{
      return(member.admin ? {...member,prizes:[...(member.prizes),data]} : member)
    }))
    setUser(users.find((member)=>{return member.admin}))
  }

  function handleNewChore(data){
    setUsers(users.map((member)=>{
      return(member.admin ? {...member,chores:[...(member.chores),data]}: member)
    }))
    setUser(users.find((member)=>{return member.admin}))
  }

  function handleEditChore(data){
    setUsers(users.map((member)=>{
      return {...member,chores:member.chores.map((chore)=>(chore.id===data.id ? data : chore))}
      }))
      setUser(users.find((member)=>{return member.admin}))
  }

  function handleCheckChore(data){
    setUsers(users.map((member)=>{
      return member.id===data[1].id ? data[1] : {...member,chores:member.chores.map((chore)=>(chore.id===data[0].id ? data[0] : chore))}
      }))
  }

  function handleClaimPrize(data){
    console.log(data)
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
            <ChorePage users={users} handleNewChore={handleNewChore} handleEditChore={handleEditChore}/>
          </Route>
          <Route exact path="/prizes">
            <PrizePage users={users} handleEditPrize={handleEditPrize} handleNewPrize={handleNewPrize} handleClaimPrize={handleClaimPrize}/>
          </Route>
          <Route path="/users">
            <UsersPage users={users}/>
          </Route>
          <Route path="/">
            <Home users={users} handleCheckChore={handleCheckChore}/>
          </Route>
       </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
