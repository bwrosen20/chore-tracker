import RepeatChore from './RepeatChore'
import NewRepeatChoreForm from './NewRepeatChoreForm'
import {useState} from 'react'

function RepeatChorePage({repeatChoreArray,users, handleEditRepeatChore, handleDeleteRepeatChore}){

    const [showNewChore,setShowNewChore]=useState(false)

    function returnFromForm(){
        setShowNewChore(!showNewChore)
    }

    console.log(repeatChoreArray)
    return <div>
            {showNewChore ? 
            <NewRepeatChoreForm users={users} returnFromForm={returnFromForm}/> :
            <button onClick={()=>setShowNewChore(!showNewChore)}>Create New Repeating Chore</button>}
            {repeatChoreArray.map((chore)=>(
                <RepeatChore chore={chore} users={users} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore}/>
            ))}
            
    </div>
}

export default RepeatChorePage