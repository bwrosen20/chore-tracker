import Chore from './Chore'
import {UserContext} from './App'
import {useContext} from 'react'

function ChorePage({users}){

    const user = useContext(UserContext)
    const admin=users.find((member)=>member.admin)

    return <div>
        
        <div>
        

        {admin.chores.length>0 ? 
        <div>
            <h1>Get Some Extra Points</h1>
            {admin.chores.map((chore)=>(
            <div>
                <Chore chore={chore}/>
            </div>
        ))}
        </div>: 
        <h1>There are currently no extra chores available</h1>}
       
        </div>
    
    </div>
}

export default ChorePage