import EditChore from './EditChore'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function Chore({chore}){

    const user = useContext(UserContext)
    const [showEditChore,setShowEditChore]=useState(false)

    function onEditChore(){
        setShowEditChore(!showEditChore)
    }

    return <div>
                {showEditChore ? 
                <EditChore onEditChore={onEditChore} chore={chore}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{(user.admin && chore.completed)? `${chore.kid}: ` : null} {chore.title}</h3>
                    <h3>{chore.point_value} points</h3>
                    {user.admin ? <button onClick={()=>setShowEditChore(!showEditChore)}>Edit Chore</button> : null}
                </div>
                
                }   
            </div>
}

export default Chore