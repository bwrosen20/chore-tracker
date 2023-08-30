import EditChore from './EditChore'
import CheckChore from './CheckChore'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function Chore({chore,users,handleEditChore,handleCheckChore,handleChoreClaim,handleFinishedChore,handleDelete}){

    const date=new Date(chore.due_date)
    const offset = (date.toString()).slice(28,33)
    const due_date = (date.toString()).slice(0,16)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const am_pm = hours >=12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    const time = hours+':'+minutes+" "+am_pm

    const completedDate = new Date(chore.updated_at)
    const completedOffset = (completedDate.toString()).slice(28,33)
    const dateCompleted = (completedDate.toString()).slice(0,16)
    let completedHours = completedDate.getHours()
    let completedMinutes = completedDate.getMinutes()
    const completed_am_pm = completedHours >=12 ? "pm" : "am"
    completedHours = completedHours % 12
    completedHours = completedHours ? completedHours : 12
    completedMinutes = completedMinutes < 10 ? '0'+completedMinutes : completedMinutes
    const completedTime = completedHours+':'+completedMinutes+" "+completed_am_pm
    const user = useContext(UserContext)
    const [showEditChore,setShowEditChore]=useState(false)
    const [checkChore,setCheckChore]=useState(false)
    const [errors,setErrors]=useState([])
    const [youSure,setYouSure]=useState(false)

    function onEditChore(data){
        setShowEditChore(!showEditChore)
        handleEditChore(data)
    }

    function onCheckChore(data){
        setCheckChore(!checkChore)
        handleCheckChore(data)
    }

    function returnFromCheckChore(){
        setCheckChore(!checkChore)
    }

    function returnFromEditChore(){
        setShowEditChore(!showEditChore)
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

    function onDelete(){
        fetch(`chores/${chore.id}`,{
            method:"DELETE"
        })
        .then(handleDelete(chore.id))
    }


    return <div className={chore.check ? chore.check.approved==="approved" ? "ChoreCardAccepted" : chore.check.approved==="rejected" ? "ChoreCardRejected" :"ChoreCard" : "ChoreCard"}>
                {showEditChore ? 
                <EditChore onEditChore={onEditChore} returnFromEditChore={returnFromEditChore} chore={chore} users={users}/>:
                <div>
                    <img src={chore.image} alt={chore.id} className="ChorePicture"/>
                    <h3>{(user.admin && chore.completed)? `${chore.kid}: ` : null} {chore.title}</h3>
                    <h3>{chore.point_value} points</h3>
                    {chore.completed ? null : <h4>Due: {due_date} @{time}</h4>}
                    {user.admin ? 
                    //if user is admin
                        (!chore.completed ?
                            <div>
                                {youSure ? 
                                <div>
                                    <a className="deleteButton" onClick={onDelete} value="one">Delete</a>
                                    <div onClick={()=>{setYouSure(false)}}className="return">
                                        <i class="fa-solid fa-arrow-left"></i>
                                    </div>
                                </div>:
                                <div>
                                    <a className="cardButton" onClick={()=>setShowEditChore(!showEditChore)}>Edit Chore</a>
                                    {<button className="delete" onClick={()=>setYouSure(true)} value="one">X</button>} 
                                </div>
                                }
                            </div>:
                            checkChore ?
                                <CheckChore returnFromCheckChore={returnFromCheckChore} onCheckChore={onCheckChore} chore={chore}/>:
                                <a className="cardButton" onClick={()=>setCheckChore(!checkChore)}>Check Chore</a>): 

                    //if user is not admin
                                    chore.check ? 
                                //if chore has a check
                                    chore.check.approved==="approved"?
                                    <div>
                                        <h3>Approved</h3>
                                        <h4>{dateCompleted} @{completedTime}</h4>
                                        </div>: 
                                        chore.check.approved==="rejected"?<div><h3 className="BottomWords">Rejected</h3><button className="BottomWords" onClick={iDidIt}>Try Again</button></div>:<h3 className="BottomWords">Pending</h3>:
                                    
                                //chore does not have a check    
                                        chore.completed ?
                                        //if chore is completed
                                        <h3>Pending</h3>:
                                        //if chore is not completed
                                        user.chores.includes(chore) ?
                                            //if chore is claimed    
                                                <a className="cardButton" onClick={iDidIt}>I did it</a>:
                                            //if a chore is not claimed
                                                <a className="cardButton" onClick={illDoIt}>I'll do it</a>}
                </div>      
                }   
                <div className="errorContainer">
                        {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
                </div>
            </div>
}

export default Chore