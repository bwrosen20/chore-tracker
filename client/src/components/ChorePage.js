import Chore from './Chore'
import NewChoreForm from './NewChoreForm'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function ChorePage({users,handleNewChore,handleEditChore,handleChoreClaim}){

    const user = useContext(UserContext)
    const admin=users.find((member)=>member.admin)
    const [newChoreForm,setNewChoreForm]=useState(false)

    function onNewChore(data){
        setNewChoreForm(!newChoreForm)
        handleNewChore(data)
    }

    

    return <div>
        {admin.chores.length>0 ? 
        <div>
            {user.admin ? 
            <div>
                {newChoreForm ? 
        <NewChoreForm onNewChore={onNewChore}/> : 
        <button onClick={()=>setNewChoreForm(!newChoreForm)}>Add New Chore</button>}
            <h2>Unnasigned Chores</h2>
            </div>
            :<h1>Get Some Extra Points</h1>
        }
            
            {admin.chores.map((chore)=>(
                <Chore chore={chore} key={chore.id} handleEditChore={handleEditChore} handleChoreClaim={handleChoreClaim}/>
        ))}
        </div>: 
        <h1>There are currently no extra chores available</h1>}
    </div>
}

export default ChorePage