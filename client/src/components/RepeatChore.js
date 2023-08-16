import {useState} from 'react'
import EditRepeatChore from './EditRepeatChore'

function RepeatChore({users,chore}){

    const [showEditRepeatChore,setShowEditRepeatChore]=useState(false)

    function returnFromEditChore(){
        setShowEditRepeatChore(!showEditRepeatChore)
    }

    
    return <div>
                {showEditRepeatChore ?
                <EditRepeatChore returnFromEditChore={returnFromEditChore} chore={chore} users={users}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{chore.title}</h3>
                    <button onClick={()=>setShowEditRepeatChore(!showEditRepeatChore)}>Edit Repeating Chore</button>
                    <button>Delete Repeating Chore</button>
                </div>}
                
        </div>
}

export default RepeatChore