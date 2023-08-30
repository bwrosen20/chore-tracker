import RepeatChore from './RepeatChore'
import NewRepeatChoreForm from './NewRepeatChoreForm'
import {useState} from 'react'

function RepeatChorePage({users, handleEditRepeatChore, handleDeleteRepeatChore,handleNewChore}){

    const [showNewChore,setShowNewChore]=useState(false)
    let repeatChoreArray = users.map((member)=>{return member.chores}).flat()
  .filter((chore)=>(chore.repeat_chore.repeat_every ? !chore.repeat_chore.repeat_every.includes("once") : null))
  .map((newChore)=>({...newChore.repeat_chore,image:newChore.image}))

  let uniqRepeatChores = []
  let count = 0
  let start = false

  for (let i = 0; i < repeatChoreArray.length; i++) {
    for (let j = 0; j < uniqRepeatChores.length; j++) {
          if ( repeatChoreArray[i].id == uniqRepeatChores[j].id ) {
              start = true
          }
    }
    count++
  if (count == 1 && start == false) {
      uniqRepeatChores.push(repeatChoreArray[i])
  }
  start = false;
  count = 0;
  }

    function returnFromForm(){
        setShowNewChore(!showNewChore)
    }

    function onNewChore(data){
        setShowNewChore(!showNewChore)
        handleNewChore(data)
    }
    return <div>
            {showNewChore ? 
            <NewRepeatChoreForm users={users} returnFromForm={returnFromForm} onNewChore={onNewChore}/> :
            <a className="PageHeading" onClick={()=>setShowNewChore(!showNewChore)}>Create New Repeating Chore</a>}
            <div className="ChoreContainer">
            {uniqRepeatChores.map((chore)=>(
                <RepeatChore key={chore.id} chore={chore} users={users} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore}/>
            ))}
            </div>
    </div>
}

export default RepeatChorePage