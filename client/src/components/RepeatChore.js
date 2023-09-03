import {useState} from 'react'
import EditRepeatChore from './EditRepeatChore'

function RepeatChore({users,chore,handleEditRepeatChore,handleDeleteRepeatChore}){

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

    
    return <div className="ChoreCard">
                {showEditRepeatChore ?
                <EditRepeatChore onEditRepeatChore={onEditRepeatChore} returnFromEditChore={returnFromEditChore} chore={chore} users={users}/>:
                <div>
                    <img src={chore.image} alt={chore.id} className="ChorePicture"/>
                    <h3>{chore.title}</h3>
                    {youSure ? 
                    <div>
                    <br></br>
                    <button className="deleteButton" onClick={onDeleteRepeatChore}>Delete</button>
                    <a className="return" onClick={()=>setYouSure(!youSure)}>Cancel</a>
                    </div>:
                    <div>
                    <a className="cardButton" onClick={()=>setShowEditRepeatChore(!showEditRepeatChore)}>Edit Repeating Chore</a>
                    <button className="delete" onClick={()=>setYouSure(!youSure)}>X</button>
                    </div>}
                </div>}
                <div className="errorContainer">
                        {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
                </div>
        </div>
}

export default RepeatChore