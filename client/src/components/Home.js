import Chore from './Chore'
import Prize from './Prize'
import {useContext,useState} from 'react'
import {UserContext} from './App'

function Home({users,handleCheckChore,handleFinishedChore,handleDelete,handleEditChore,handleAwardPrize}){
    

    const user = useContext(UserContext)


    const completedChores=user.chores.filter((chore)=>(chore.completed)).sort((a,b)=>(new Date(b.updated_at)-new Date(a.updated_at))).slice(0,3)
    const recentPrizes=user.prizes.sort((a,b)=>(new Date(b.updated_at)-new Date(a.updated_at))).slice(0,3)
    const toDoList = user.chores.filter((chore)=>(!chore.completed))
    const prizesToAward = users.filter((member)=>(!member.admin)).map((participant)=>(participant.prizes)).flat().filter((prize)=>(!prize.awarded))
    

        const choreArray=[]
        users.forEach((member)=>(choreArray.push(...(member.chores))))
        const toBeChecked=choreArray.filter((chore)=>chore.completed && (!chore.check||chore.check.approved!=="approved"))
        const userArray=users.filter((member)=>(!member.admin))

   


    return <div>
        {user.admin?

        //User is admin
        <div>
            <div className="homeContainer">
                <div className="userInfo">
                    <img src={user.profile_image} alt={user.username} className="homeImage"/>
                </div>
                <div className="ChoreSection">
                    <h1 className="heading">To Be Checked</h1>
                    <div className="choreContainer">
                    {toBeChecked.map((chore)=>(
                        <Chore key={chore.id} chore={chore} handleCheckChore={handleCheckChore}/> 
                    ))}
                    </div>
               </div>
               <div className="ChoreSection">
                    <h1 className="heading">Prizes Earned</h1>
                    <div className="choreContainer">
                        {prizesToAward.map((prize)=>(
                            <Prize key={prize.id} prize={prize} handleAwardPrize={handleAwardPrize}/>
                        ))}
                    </div>
                </div>
               </div>

               <h2 className="heading">User To Do Lists</h2>
                <div className="homeContainer">
                    {userArray.map((member)=>(
                        <div  className="ChoreSection">
                            {member.chores.filter((chore)=>(!chore.completed)).length >0 ? <h4 className="heading">{member.username}</h4> : null}
                            <div className="choreContainer">
                                {member.chores.filter((chore)=>!chore.completed).map((chore)=>(
                                    <Chore key={chore.id} chore={chore} users={users} handleEditChore={handleEditChore} handleDelete={handleDelete}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
           
        </div>:

        //User is not admin

            <div>
                <div className="homeContainer">
                    <div className="userInfo">
                        <img className="homeImage" src={user.profile_image} alt={user.name}/>  
                        <h3 className="points">You have {user.points ? user.points : "0"} points</h3>
                    </div>

                    <div className="ChoreSection">
                        <h2 className="heading">To Do List</h2>
                        <div className="choreContainer">
                        {toDoList.map((chore)=>(
                            <Chore key={chore.id} chore={chore} handleFinishedChore={handleFinishedChore}/>
                        ))}
                    </div>
                </div>
                </div>
                <div className="homeContainer">
                <div clasName="ChoreSection">
                    <h2 className="heading">Recently Claimed Prizes</h2>
                    <div className="choreContainer">
                        {recentPrizes.map((prize)=>(
                        <Prize key={prize.id} prize={prize}/>
                        ))}
                    </div>
                </div>
                <div className="ChoreSection">
                <h2 className="heading">Recently Completed Chores</h2>
                    <div className="choreContainer">
                    {completedChores.map((chore)=>(
                    <Chore key={chore.id} chore={chore}/>
                    ))}
                    </div>
                </div>
            </div>
        </div>
            }
    </div>
}

export default Home