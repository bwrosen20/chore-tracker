import {UserContext} from './App'
import {useContext} from 'react'

function Chore({chore}){

    const user = useContext(UserContext)

    return <div>
        <div>
                <img src={chore.image} alt={chore.id}/>
                <h3>{user.admin ? chore.kid : null}{user.admin ? ":": null} {chore.title}</h3>
                <h3>{chore.point_value} points</h3>
            </div>
    </div>
}

export default Chore