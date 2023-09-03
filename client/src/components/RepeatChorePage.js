import RepeatChore from './RepeatChore'
import NewRepeatChoreForm from './NewRepeatChoreForm'
import {useState} from 'react'

function RepeatChorePage({users,handleEditRepeatChore,uniqRepeatChores,handleDeleteRepeatChore,handleNewRepeatChore}){

    const [showNewChore,setShowNewChore]=useState(false)
    const [showInfo,setShowInfo]=useState(false)
   

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
            <div className="headingContainer"><a className="PageHeading" onClick={()=>setShowNewChore(!showNewChore)}>Add new Repeat Chore</a><div className={showInfo ? "infoFocus":"info"} onMouseOver={()=>setShowInfo(true)} onMouseLeave={()=>(setShowInfo(false))} onClick={()=>(setShowInfo(!showInfo))}> <i class="fa-solid fa-question"></i></div>
            <p className={showInfo ? "buttonInfo" : "buttonInfoNone"}>Create a new repeat chore. If you would like to make a 
            new single chore, please go to the single chore page. When a new repeat chore is created, we will automatically
            assign a new chore/chores to the user/users to whom the chore is assigned. When a repeat chore is approved,
            we will automatically assign the next chore.</p></div>}
            <div className="ChoreContainer">
            {uniqRepeatChores.map((chore)=>(
                <RepeatChore key={chore.id} chore={chore} users={users} handleEditRepeatChore={handleEditRepeatChore} handleDeleteRepeatChore={handleDeleteRepeatChore}/>
            ))}
            </div>
    </div>
}

export default RepeatChorePage