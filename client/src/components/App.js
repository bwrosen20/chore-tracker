import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import ChorePage from './ChorePage'
import PrizePage from './PrizePage'
import UsersPage from './UsersPage'
import React, {useState, useEffect} from 'react'
import {Route,Switch,useHistory} from 'react-router-dom'

export const UserContext = React.createContext()

function App() {

  const [user,setUser]=useState(null)
  const [users,setUsers]=useState([])
  const history = useHistory()

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
    const admin = users.find((member)=>member.admin)
    admin.prizes=admin.prizes.filter((prize)=>(prize.id!==data[0].id))
    if (data[1]){
      admin.prizes=[...admin.prizes,data[1]]
      console.log(admin.prizes)
    }
    setUsers(users.map((member)=>{
      if (member.id===user.id){
        return {...user,prizes:[...(user.prizes),data[0]],points:user.points-data[0].point_value}
      }
      else if (member.admin){
        return admin
      }
      else{
        return member
      }
    }))
    setUser({...user,prizes:[...(user.prizes),data[0]],points:user.points-data[0].point_value})
    
    history.push('/')
  }

  function handleChoreClaim(data){
    setUsers(users.map((member)=>{
      if (member.admin){
        return {...member,chores:(member.chores.filter((chore)=>(data.id!==chore.id)))}
      }
      else if (member.id===user.id){
        return {...member,chores:[...(member.chores),data]}
      }
      else{
        return member
      }
    }))
    setUser({...user,chores:[...(user.chores),data]})
  }

  function handleFinishedChore(data){
    setUsers(users.map((member)=>{
      return {...member,chores:member.chores.map((chore)=>(chore.id===data.id ? data : chore))}
      }))
      setUser({...user,chores:user.chores.map((chore)=>(chore.id===data.id? data : chore))})
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
            <ChorePage users={users} handleNewChore={handleNewChore} handleEditChore={handleEditChore} handleChoreClaim={handleChoreClaim}/>
          </Route>
          <Route exact path="/prizes">
            <PrizePage users={users} handleEditPrize={handleEditPrize} handleNewPrize={handleNewPrize} handleClaimPrize={handleClaimPrize}/>
          </Route>
          <Route path="/users">
            <UsersPage users={users}/>
          </Route>
          <Route path="/">
            <Home users={users} handleCheckChore={handleCheckChore} handleFinishedChore={handleFinishedChore}/>
          </Route>
       </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
