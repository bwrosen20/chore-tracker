import Chore from './Chore'
import Prize from './Prize'
import {useContext} from 'react'
import {UserContext} from './App'

function Home(){

    const user = useContext(UserContext)

    const completedChores=user.chores.filter((chore)=>(chore.completed))
    const toDoList = user.chores.filter((chore)=>(!chore.completed))


    return <div>
        {user.admin?
        <div>
            <h1>I'm an admin and this is home</h1>
        </div>:
        
        <div>
        <h1>Home</h1> 
        <img src={user.profile_image} alt={user.id}/>  
        <h3>You have {user.points} points</h3>

        <h2>Recently Claimed Prizes</h2>
        {user.prizes.map((prize)=>(
           <Prize prize={prize}/>
        ))}

        <h2>Recently Completed Chores</h2>
        {completedChores.map((chore)=>(
           <Chore chore={chore}/>
        ))}

        <h2>To Do List</h2>
            {toDoList.map((chore)=>(
                <div>
                    <Chore chore={chore} />
                    <button>I did it</button>
                </div>
            ))}
        </div>
        }
    </div>
}

export default Home