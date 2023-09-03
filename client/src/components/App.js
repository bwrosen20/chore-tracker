import '../App.css';
import NavBar from './NavBar'
import OpeningPage from './OpeningPage'
import Home from './Home'
import ChorePage from './ChorePage'
import PrizePage from './PrizePage'
import UsersPage from './UsersPage'
import RepeatChorePage from './RepeatChorePage'
import React, {useState, useEffect} from 'react'
import {Route,Switch,useHistory} from 'react-router-dom'

export const UserContext = React.createContext()

function App() {

  const [user,setUser]=useState(null)
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(false)
  const history = useHistory()

  useEffect(()=>{
    setLoading(true)
    fetch('/me')
    .then(r=>{
      if (r.ok){
        r.json().then((data)=>{
          setUser(data)

          fetch('/users')
          .then(r=>{
            if (r.ok){
              r.json().then((res)=>{
                setUsers(res)

                setLoading(false)
            })
            }
          })
        })
      }
      else{
        setLoading(false)
      }
    })
    
  },[])

  if (!user) return <OpeningPage onLogin={handleLogin} />

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
    for (let i=0;i<data.length;i++){
    setUsers(users.map((member)=>{
      return(member.admin ? {...member,chores:[...(member.chores),data[i]]}: member)
    }))
    setUser({...user,chores:[...(user.chores),data[i]]})
  }
  }

  function handleNewRepeatChore(data){

    console.log(data)

    const repeatChore=data[data.length-1]
    const chores=data.slice(0,data.length-1)
    //array of chores and a new repeat chore

    setUsers(users.map((member)=>{
      if (repeatChore.participants.includes((member.id).toString())){
        const new_chore = chores.find((chore)=>(chore.user_id===member.id))
        return ({...member,chores:[...member.chores,new_chore],repeat_chores:[...member.repeat_chores,repeatChore]})
      }
      else{
        return member
      }
    }))
      if (repeatChore.participants.includes((user.id).toString())){
        const new_chore = chores.find((chore)=>(chore.user_id===user.id))
        setUser({...user,chores:[...user.chores,new_chore],repeat_chores:[...user.repeat_chores,repeatChore]})
      }
    // for (let i=0;i<chores.length;i++){
    //   setUsers(users.map((member)=>{
    //     console.log(member.id===chores[i].user_id)
    //     return(member.id===chores[i].user_id ? {...member,chores:[...(member.chores),chores[i]]}: member)
    //   }))
    //   setUser({...user,chores:[...(user.chores),data[i]]})
    // }
    // setUsers(users.map((member)=>{
    //   return(repeatChore.participants.includes((member.id).toString()) ? {...member,repeat_chores:[...member.repeat_chores,repeatChore]}: member)
    // }))
    // setUser(repeatChore.participants.includes((user.id).toString()) ? {...user,repeat_chores:[...user.repeat_chores,repeatChore]}: user)
  }

  function handleEditChore(data){
    const user_id = users.map((member)=>(member.chores)).flat().find((chore)=>chore.id===data.id).user_id

    if (user_id===data.user_id){
    setUsers(users.map((member)=>{
      return {...member,chores:member.chores.map((chore)=>(chore.id===data.id ? data : chore))}
      }))
      setUser(users.find((member)=>{return member.admin}))
    }
    else{
      setUsers(users.map((member)=>{
        if (member.id===user_id){
        return {...member,chores:member.chores.filter((chore)=>(chore.id!==data.id))}
        }
        if (member.id===data.user_id){
          return {...member,chores:[...(member.chores),data]}
        }
        if (member.id!==data.user_id && member.id!==user_id){
          return member
        }
      }))
      setUser(users.find((member)=>{return member.admin}))
      }
    }

  function handleCheckChore(data){
    if (data[1]){
      setUsers(users.map((member)=>{
        if ((data[1].user_id===data[0].user_id) && (data[0].user_id===member.id)){
          return {...member,chores:[...(member.chores.map((chore)=>(chore.id===data[0].id ? data[0] : chore))),data[1]]}
        }
        else if (member.id===data[0].user_id){
          return {...member,chores:member.chores.map((chore)=>(chore.id===data[0].id ? data[0] : chore))}
        }
        else if (member.id===data[1].user_id){
          return {...member,chores:[...(member.chores),data[1]]}
        }
        else{
          return member
        }
      }))
     
    }
    else{

      setUsers(users.map((member)=>{
        if (member.id===data.user_id){
          return {...member,chores:(member.chores).map((chore)=>(chore.id===data.id ? data : chore))}
        }
        else{
          return member
        }
    }))
    }
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

  function handleDelete(data){
    setUsers(users.map((member)=>{
      return {...member,chores:member.chores.filter((chore)=>(chore.id!==data))}
      }))
      setUser({...user,chores:user.chores.filter((chore)=>chore.id!==data)})
  }

  function handleEditRepeatChore(data){
    setUsers(users.map((member)=>{
      return {...member,repeat_chores:member.repeat_chores.map((repeat_chore)=>(repeat_chore.id===data.id ? data : repeat_chore))}
    }))
    setUser({...user,repeat_chores:user.repeat_chores.map((repeat_chore)=>(repeat_chore.id===data.id ? data : repeat_chore))})
  }

  function handleDeleteRepeatChore(data,id){
    setUsers(users.map((member)=>{
      return {...member,chores:member.chores.map((chore)=>(chore.repeat_chore.id===id ? {...chore,repeat_chore:data} : chore)),
              repeat_chores:member.repeat_chores.filter((repeat_chore)=>(repeat_chore.id!==id))}
    }))
    setUser({...user,chores:user.chores.map((chore)=>(chore.repeat_chore.id===id ? data : chore)),
              repeat_chores:user.repeat_chores.filter((repeat_chore)=>(repeat_chore.id!==id))})
  }

  function handleDeletePrize(data){
    setUsers(users.map((member)=>{
      if (member.admin){
        return {...member,prizes:member.prizes.filter((prize)=>(prize.id!==data))}
      }
      else {
        return member
      }
    }))
      setUser({...user,prizes:user.prizes.filter((prize)=>(prize.id!==data))})
  }

  const repeatArray = []
  const repeatChoreArray = users.map((participant)=>(participant.repeat_chores)).flat().filter((chore)=>(!chore.repeat_every.includes("once")))

  if (repeatChoreArray.length>0){
   repeatChoreArray.forEach((repeat_chore)=>{
        repeatArray.push(repeat_chore)
   })
  }

let uniqRepeatChores = []
let count = 0
let start = false

for (let i = 0; i < repeatArray.length; i++) {
  for (let j = 0; j < uniqRepeatChores.length; j++) {
        if ( repeatArray[i].id == uniqRepeatChores[j].id ) {
            start = true
        }
  }
  count++
if (count == 1 && start == false) {
    uniqRepeatChores.push(repeatArray[i])
}
start = false;
count = 0;
}

  return (
    <div>{loading ? <h3 className="heading">Loading...</h3>:
      <div>
        <UserContext.Provider value={user}>
        <NavBar handleLogout={handleLogout}/>
        <Switch>
            <Route exact path="/login">
              <OpeningPage onLogin={handleLogin}/>
            </Route>
            <Route exact path="/chores">
              <ChorePage users={users} handleNewChore={handleNewChore} handleEditChore={handleEditChore} handleChoreClaim={handleChoreClaim} handleDelete={handleDelete}/>
            </Route>
            <Route exact path="/repeat">
              <RepeatChorePage handleNewRepeatChore={handleNewRepeatChore} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore} users={users} uniqRepeatChores={uniqRepeatChores}/>
            </Route>
            <Route exact path="/prizes">
              <PrizePage users={users} handleDeletePrize={handleDeletePrize} handleEditPrize={handleEditPrize} handleNewPrize={handleNewPrize} handleClaimPrize={handleClaimPrize}/>
            </Route>
            <Route path="/users">
              <UsersPage users={users} uniqRepeatChores={uniqRepeatChores}/>
            </Route>
            <Route path="/">
              <Home users={users} handleCheckChore={handleCheckChore} handleFinishedChore={handleFinishedChore} handleDelete={handleDelete} handleEditChore={handleEditChore}/>
            </Route>
        </Switch>
        </UserContext.Provider>
      </div>}
    </div>
  );
}

export default App;
