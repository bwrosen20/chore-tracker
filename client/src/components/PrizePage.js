import Prize from './Prize'
import {UserContext} from './App'
import {useContext} from 'react'

function PrizePage({users}){

    const user = useContext(UserContext)
    const admin = users.find((member)=>(member.admin))

    return <div>
        {user.admin?
        <div>
            <h1>I'm an admin and this is prizes</h1>
        </div>:
        <div>
        <h1>Available Prizes</h1>
        {admin.prizes.map((prize)=>(
            <Prize prize={prize} />
        ))}
        </div>
        }
    </div>
}

export default PrizePage