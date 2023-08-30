import User from './User'

function UsersPage({users}){

    const admins = users.filter((member)=>member.admin)
    const kids = users.filter((member)=>!member.admin)
    return <div className="UserContainer">
                <div className="UserSection">
                    <h2 className="heading">Admins</h2>
                    {admins.map((user)=>(
                        <User user={user} users={users}/>
                    ))}
                </div>
                <div className="UserSection">
                    <h2 className="heading">Users</h2>
                    {kids.map((user)=>
                    <User user={user} users={users}/>)}
                </div>
    </div>
}

export default UsersPage