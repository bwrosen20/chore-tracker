import Prize from './Prize'
import {UserContext} from './App'
import {useContext} from 'react'

function PrizePage({users,handleEditPrize}){

    const user = useContext(UserContext)
    const admin = users.find((member)=>(member.admin))

    const prizes=admin.prizes.sort((a,b)=>b.point_value-a.point_value)

    return <div>
    
        <h1>Available Prizes</h1>
        {prizes.map((prize)=>(
            <Prize prize={prize} key={prize.id} handleEditPrize={handleEditPrize}/>
        ))}
        
    </div>
}

export default PrizePage