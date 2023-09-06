function User({user,uniqRepeatChores}){

    const repeat_array = uniqRepeatChores.filter((chore)=>(chore.participants.includes((user.id).toString())))

    return <div className={user.admin ? "adminCard":"userCard"}>
        <div>
            <img src={user.profile_image} alt={user.username} className="userPicture"/>
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