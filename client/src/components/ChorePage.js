import Chore from './Chore'
import {UserContext} from './App'
import {useContext} from 'react'

function ChorePage({users}){

    const user = useContext(UserContext)
    const admin=users.find((member)=>member.admin)

    return <div>
        {user.admin?
        <div>
            <h1>I'm an admin and this is chores</h1>
            </div>:
        <div>
        <h1>Get Some Extra Points</h1>
        {admin.chores.map((chore)=>(
            <div>
                <Chore chore={chore}/>
            </div>
        ))}
        </div>
        }
    </div>
}

export default ChorePage