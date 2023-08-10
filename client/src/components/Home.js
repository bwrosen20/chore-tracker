import Chore from './Chore'
import Prize from './Prize'
import {useContext,useState} from 'react'
import {UserContext} from './App'

function Home({users,handleCheckChore,handleFinishedChore}){

    const user = useContext(UserContext)


    const completedChores=user.chores.filter((chore)=>(chore.completed)).slice(0,3)
    const toDoList = user.chores.filter((chore)=>(!chore.completed))
    

        const choreArray=[]
        users.forEach((member)=>(choreArray.push(...(member.chores))))
        const toBeChecked=choreArray.filter((chore)=>chore.completed && (!chore.check||chore.check.approved!=="approved"))

   


    return <div>
        {user.admin?
        <div>
            <img src={user.profile_image} alt={user.username} />
            <h1>Chores that need to be checked</h1>
            {toBeChecked.map((chore)=>(
                <Chore key={chore.id} chore={chore} handleCheckChore={handleCheckChore}/> 
            ))}
        </div>:
        
        <div>
        <h1>Home</h1> 
        <img src={user.profile_image} alt={user.name}/>  
        <h3>You have {user.points} points</h3>

        <h2>Recently Claimed Prizes</h2>
        {(user.prizes.slice(0,3)).map((prize)=>(
           <Prize key={prize.id} prize={prize}/>
        ))}

        <h2>Recently Completed Chores</h2>
        {completedChores.map((chore)=>(
           <Chore key={chore.id} chore={chore}/>
        ))}

        <h2>To Do List</h2>
            {toDoList.map((chore)=>(
                    <Chore key={chore.id} chore={chore} handleFinishedChore={handleFinishedChore}/>
            ))}
        </div>
        }
    </div>
}

export default Home