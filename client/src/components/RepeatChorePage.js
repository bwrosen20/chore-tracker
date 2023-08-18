import RepeatChore from './RepeatChore'
import NewRepeatChoreForm from './NewRepeatChoreForm'
import {useState} from 'react'

function RepeatChorePage({repeatChoreArray,users, handleEditRepeatChore, handleDeleteRepeatChore,handleNewChore}){

    const [showNewChore,setShowNewChore]=useState(false)

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
            <button onClick={()=>setShowNewChore(!showNewChore)}>Create New Repeating Chore</button>}
            {repeatChoreArray.map((chore)=>(
                <RepeatChore key={chore.id} chore={chore} users={users} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore}/>
            ))}
            
    </div>
}

export default RepeatChorePage