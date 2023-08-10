import EditChore from './EditChore'
import CheckChore from './CheckChore'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function Chore({chore,users,handleEditChore,handleCheckChore,handleChoreClaim,handleFinishedChore}){

    const user = useContext(UserContext)
    const [showEditChore,setShowEditChore]=useState(false)
    const [checkChore,setCheckChore]=useState(false)
    const [errors,setErrors]=useState([])

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
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }

    function iDidIt(){
        fetch ('chores/finished',{
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
                r.json().then(res=>handleFinishedChore(res))
            }
            else{
                r.json().then(err=>console.log(err.errors))
            }
        })
    }


    return <div>
                {showEditChore ? 
                <EditChore onEditChore={onEditChore} chore={chore} users={users}/>:
                <div>
                    <img src={chore.image} alt={chore.id}/>
                    <h3>{(user.admin && chore.completed)? `${chore.kid}: ` : null} {chore.title}</h3>
                    <h3>{chore.point_value} points</h3>
                    {user.admin ? 
                    //if user is admin
                        (!chore.completed ?
                            <button onClick={()=>setShowEditChore(!showEditChore)}>Edit Chore</button> :
                            checkChore ?
                                <CheckChore onCheckChore={onCheckChore} chore={chore}/>:
                                <button onClick={()=>setCheckChore(!checkChore)}>Check Chore</button>): 


                    //if user is not admin
                                    chore.check ? 
                                //if chore has a check
                                    chore.check.approved==="approved"?<h3>Approved</h3>: 
                                        chore.check.approved==="rejected"?<div><h3>Rejected</h3><button onClick={iDidIt}>Try Again</button></div>:<h3>Pending</h3>:
                                    
                                //chore does not have a check    
                                        chore.completed ?
                                        //if chore is completed
                                        <h3>Pending</h3>:
                                        //if chore is not completed
                                        user.chores.includes(chore) ?
                                            //if chore is claimed    
                                                <button onClick={iDidIt}>I did it</button>:
                                            //if a chore is not claimed
                                                <button onClick={illDoIt}>I'll do it</button>}
                </div>      
                }   
                {errors.map((error)=>(<error key={error}>{error}</error>))}
            </div>
}

export default Chore