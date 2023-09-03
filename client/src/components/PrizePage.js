import Prize from './Prize'
import NewPrizeForm from './NewPrizeForm'
import {UserContext} from './App'
import {useContext, useState} from 'react'

function PrizePage({users,handleEditPrize,handleNewPrize,handleClaimPrize,handleDeletePrize}){

    const user = useContext(UserContext)
    const admin = users.find((member)=>(member.admin))
    const [newPrize, setNewPrize]=useState(false)

    const prizes=admin.prizes.sort((a,b)=>b.point_value-a.point_value)

    function onNewPrize(data){
        setNewPrize(!newPrize)
        handleNewPrize(data)
    }

    return <div>
    
        <h1 className="heading">Available Prizes</h1>
        {user.admin ? 
            newPrize ? 
            <NewPrizeForm onNewPrize={onNewPrize}/>
            :<a className="PageHeading" onClick={()=>setNewPrize(!newPrize)}>Add new Prize</a> : null}
        <div className="PrizeContainer">
            {prizes.map((prize)=>(
                <Prize prize={prize} key={prize.id} handleDeletePrize={handleDeletePrize} handleEditPrize={handleEditPrize} handleClaimPrize={handleClaimPrize}/>
            ))}
        </div>
    </div>
}

export default PrizePage