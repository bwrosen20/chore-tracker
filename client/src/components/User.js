function User({user, users}){

    console.log(users)
   const repeat_array = []

   const chore_array = (users.filter((member)=>(!member.admin))).map((participant)=>(participant.chores)).flat()
   console.log(chore_array)

   user.user_repeat_chores.forEach((repeat_chore)=>{
        const chore_image = chore_array.find((chore)=>(repeat_chore.id===chore.repeat_chore.id)).image
         repeat_array.push({...repeat_chore,image:chore_image})
    })

    return <div className={user.admin ? "adminCard":"userCard"}>
        <div>
            <img src={user.profile_image} alt={user.username} className="UserPicture"/>
            <h2 >{user.username}</h2>
            {!user.admin ? <h3>Points: {user.points}</h3> : null}
        </div>
        
        {user.admin ? null : 
        <div>
            <h4>{user.username}'s Repeating Chores</h4>
            <div className="userChoreContainer">
                {repeat_array.map((chore)=>(
                    <div className="userChore">
                        <h5>{chore.title}</h5>
                        <img className="userChoreImages" src={chore.image} alt={chore.id}></img>
                    </div>
                ))}
                </div>
        </div>}

    </div>
}

export default User