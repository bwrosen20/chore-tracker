function User({user}){
    return <div className="UserCard">
        <img src={user.profile_image} alt={user.username} className="UserPicture"/>
        <h2 >{user.username}</h2>
        {user.admin ? null : <h3>Points: {user.points}</h3>}

    </div>
}

export default User