import RepeatChore from './RepeatChore'
import NewRepeatChoreForm from './NewRepeatChoreForm'
import {useState} from 'react'

function RepeatChorePage({users,handleEditRepeatChore,uniqRepeatChores,handleDeleteRepeatChore,handleNewRepeatChore}){

    const [showNewChore,setShowNewChore]=useState(false)

   

    function returnFromForm(){
        setShowNewChore(!showNewChore)
    }

    function onNewRepeatChore(data){
        setShowNewChore(!showNewChore)
        handleNewRepeatChore(data)
    }
    return <div>
            {showNewChore ? 
            <NewRepeatChoreForm users={users} returnFromForm={returnFromForm} onNewRepeatChore={onNewRepeatChore}/> :
            <a className="PageHeading" onClick={()=>setShowNewChore(!showNewChore)}>Create New Repeating Chore</a>}
            <div className="ChoreContainer">
            {uniqRepeatChores.map((chore)=>(
                <RepeatChore key={chore.id} chore={chore} users={users} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore}/>
            ))}
            </div>
    </div>
}

export default RepeatChorePage