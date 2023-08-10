import EditChore from './EditChore'
import CheckChore from './CheckChore'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function Chore({chore,handleEditChore,handleCheckChore,handleChoreClaim}){

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


    function illDoIt(){
        fetch('chores/claim',{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                chore_id:chore.id
            })
        })
        .then(r=>{
            if (r.ok){
                r.json().then(data=>handleChoreClaim(data))
            }
            else{
                r.json().then(err=>console.log(err.errors))
            }
        })
    }


    return <div>
                {showEditChore ? 
                <EditChore onEditChore={onEditChore} chore={chore}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{(user.admin && chore.completed)? `${chore.kid}: ` : null} {chore.title}</h3>
                    <h3>{chore.point_value} points</h3>
                    {user.admin ? 
                        !chore.completed ?
                            <button onClick={()=>setShowEditChore(!showEditChore)}>Edit Chore</button> :
                            checkChore ?
                                <CheckChore onCheckChore={onCheckChore} chore={chore}/>:
                                <button onClick={()=>setCheckChore(!checkChore)}>Check Chore</button>: 
                                    chore.completed ? 
                                        null : 
                                            user.chores.includes(chore) ? 
                                                <button>I did it</button>
                                             : <button onClick={illDoIt}>I'll do it</button>}
                </div>
                }   
            </div>
}

export default Chore