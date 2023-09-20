import Chore from './Chore'
import NewChoreForm from './NewChoreForm'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function ChorePage({users,handleNewChore,handleEditChore,handleChoreClaim,handleDelete}){

    const user = useContext(UserContext)
    const admin=users.find((member)=>member.admin)
    const [newChoreForm,setNewChoreForm]=useState(false)
    const [showInfo,setShowInfo]=useState(false)

    function onNewChore(data){
        setNewChoreForm(!newChoreForm)
        handleNewChore(data)
    }





return <div>
            {user.admin ? <div>
                {newChoreForm ? <NewChoreForm onNewChore={onNewChore} users={users}/>:<div>
                <h2 className="heading">Unnasigned Chores</h2>
                <div className="headingContainer"><a className="pageHeading" onClick={()=>setNewChoreForm(!newChoreForm)}>Add new Chore</a><div className={showInfo ? "infoFocus":"info"} onMouseOver={()=>setShowInfo(true)} onMouseLeave={()=>(setShowInfo(false))} onClick={()=>(setShowInfo(!showInfo))}> <i class="fa-solid fa-question"></i></div>
            <p className={showInfo ? "buttonInfo" : "buttonInfoNone"}>Create a new single chore. This chore will never repeat.
            If you would like to make a repeating chore, please go to the repeating chore page.</p></div>
                </div>}
                </div>: 
                    <div>
                        {admin.chores.length>0 ? 
                            <h1 className="heading">Get Some Extra Points</h1>:
                            <h1 className="heading">There are currently no extra chores available</h1>}
                    </div>}
                    <div className="choreContainer">
                        {admin.chores.map((chore)=>(
                            <Chore chore={chore} key={chore.id} handleEditChore={handleEditChore} handleChoreClaim={handleChoreClaim} handleDelete={handleDelete} users={users}/>
                        ))}
                </div>
        </div>
}

export default ChorePage