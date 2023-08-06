import EditChore from './EditChore'
import CheckChore from './CheckChore'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function Chore({chore,handleEditChore,handleCheckChore}){

    const user = useContext(UserContext)
    const [showEditChore,setShowEditChore]=useState(false)
    const [checkChore,setCheckChore]=useState(false)

    function onEditChore(data){
        setShowEditChore(!showEditChore)
        handleEditChore(data)
    }

    function onCheckChore(data){
        setCheckChore(!checkChore)
        handleCheckChore(data)
    }



    return <div>
                {showEditChore ? 
                <EditChore onEditChore={onEditChore} chore={chore}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{(user.admin && chore.completed)? `${chore.kid}: ` : null} {chore.title}</h3>
                    <h3>{chore.point_value} points</h3>
                    {user.admin ? !chore.completed ?
                    <button onClick={()=>setShowEditChore(!showEditChore)}>Edit Chore</button> :
                    checkChore ?
                    <CheckChore onCheckChore={onCheckChore} chore={chore}/>:
                    <button onClick={()=>setCheckChore(!checkChore)}>Check Chore</button>: null}
                    
                </div>
                }   
            </div>
}

export default Chore