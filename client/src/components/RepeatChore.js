import {useState} from 'react'
import EditRepeatChore from './EditRepeatChore'

function RepeatChore({users,chore, handleEditRepeatChore, handleDeleteRepeatChore}){

    const [showEditRepeatChore,setShowEditRepeatChore]=useState(false)
    const [youSure,setYouSure]=useState(false)
    const [errors,setErrors]=useState([])

    function returnFromEditChore(){
        setShowEditRepeatChore(!showEditRepeatChore)
    }



    function onEditRepeatChore(data){
        setShowEditRepeatChore(!showEditRepeatChore)
        handleEditRepeatChore(data)
    }

    function onDeleteRepeatChore(){
        fetch (`repeat_chores/${chore.id}`,{
            method:"DELETE"
        }).then(r=>{
            if (r.ok){
                r.json().then(data=>handleDeleteRepeatChore(data,chore.id))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }

    
    return <div>
                {showEditRepeatChore ?
                <EditRepeatChore onEditRepeatChore={onEditRepeatChore} returnFromEditChore={returnFromEditChore} chore={chore} users={users}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{chore.title}</h3>
                    {youSure ? 
                    <div>
                    <label>You Sure?</label>
                    <button onClick={onDeleteRepeatChore}>I'm sure</button>
                    <button onClick={()=>setYouSure(!youSure)}>Cancel</button>
                    </div>:
                    <div>
                    <button onClick={()=>setShowEditRepeatChore(!showEditRepeatChore)}>Edit Repeating Chore</button>
                    <button onClick={()=>setYouSure(!youSure)}>Delete Repeating Chore</button>
                    </div>}
                </div>}
                {errors.map((error)=>(<error key={error}>{error}</error>))}
        </div>
}

export default RepeatChore