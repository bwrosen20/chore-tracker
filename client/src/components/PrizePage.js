import Prize from './Prize'
import NewPrizeForm from './NewPrizeForm'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function PrizePage({users,handleEditPrize}){

    const user = useContext(UserContext)
    const admin = users.find((member)=>(member.admin))
    const [newPrize, setNewPrize]=useState(false)

    const prizes=admin.prizes.sort((a,b)=>b.point_value-a.point_value)

    function handleNewPrize(){
        setNewPrize(!newPrize)
    }

    return <div>
    
        <h1>Available Prizes</h1>
        {user.admin ? 
        newPrize ? 
        <NewPrizeForm handleNewPrize={handleNewPrize}/>
        :<button onClick={()=>setNewPrize(!newPrize)}>Add new Prize</button> : null}
        {prizes.map((prize)=>(
            <Prize prize={prize} key={prize.id} handleEditPrize={handleEditPrize}/>
        ))}
        
    </div>
}

export default PrizePage