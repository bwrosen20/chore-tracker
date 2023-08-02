import {useContext} from 'react'
import {UserContext} from './App'

function Home(){

    const user = useContext(UserContext)
    return <div>
        <h1>Home</h1>   
        <h3>You have {user.points} points</h3>
    </div>
}

export default Home