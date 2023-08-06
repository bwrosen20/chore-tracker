function User({user}){
    return <div>
        <img src={user.profile_image} alt={user.username}/>
        <h2>{user.username}</h2>
        <h3>Points: {user.points}</h3>

    </div>
}

export default User