import {UserContext} from './App'
import {useContext} from 'react'

function Prize({prize}){

    const user = useContext(UserContext)

    return <div>
                <img src={prize.image} alt={prize.id}/>
                <h3>{prize.title}</h3>
                <h4>{prize.point_value} Points</h4>
                {user.admin? <div> 
            <button>Edit Prize</button>
        </div> : 
        <div> 
            <button>Claim Prize</button>
            </div>}

    </div>
}

export default Prize