import Chore from './Chore'
import Prize from './Prize'
import {useContext,useState} from 'react'
import {UserContext} from './App'

function Home({users,handleCheckChore,handleFinishedChore,handleDelete,handleEditChore}){

    const user = useContext(UserContext)


    const completedChores=user.chores.filter((chore)=>(chore.completed)).sort((a,b)=>(new Date(b.updated_at)-new Date(a.updated_at))).slice(0,3)
    const recentPrizes=user.prizes.sort((a,b)=>(new Date(b.updated_at)-new Date(a.updated_at))).slice(0,3)
    const toDoList = user.chores.filter((chore)=>(!chore.completed))
    

        const choreArray=[]
        users.forEach((member)=>(choreArray.push(...(member.chores))))
        const toBeChecked=choreArray.filter((chore)=>chore.completed && (!chore.check||chore.check.approved!=="approved"))
        const userArray=users.filter((member)=>(!member.admin))

   


    return <div>
        {user.admin?
        <div>
            <img src={user.profile_image} alt={user.username} />
            <h1>Chores that need to be checked</h1>
            {toBeChecked.map((chore)=>(
                <Chore key={chore.id} chore={chore} handleCheckChore={handleCheckChore}/> 
            ))}
            <div>
                <h2>User To Do Lists</h2>
                {userArray.map((member)=>(
                    <div>
                        <h4>{member.username}</h4>
                        {member.chores.filter((chore)=>!chore.completed).map((chore)=>(
                            <Chore key={chore.id} chore={chore} users={users} handleEditChore={handleEditChore} handleDelete={handleDelete}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>:
        
        <div>
        <h1>Home</h1> 
        <img src={user.profile_image} alt={user.name}/>  
        <h3>You have {user.points} points</h3>

        <h2>Recently Claimed Prizes</h2>
        {recentPrizes.map((prize)=>(
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