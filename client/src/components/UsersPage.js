import User from './User'
import {useState} from 'react'

function UsersPage({users}){
    return <div>
        {users.map((user)=>(
            <User user={user}/>
        ))}
    </div>
}

export default UsersPage