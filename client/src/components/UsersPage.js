import User from './User'

function UsersPage({users,uniqRepeatChores}){

    const admins = users.filter((member)=>member.admin)
    const kids = users.filter((member)=>!member.admin)
    return <div className="userContainer">
                <div className="userSection">
                    <h2 className="heading">Admins</h2>
                    {admins.map((user)=>(
                        <User user={user} users={users} uniqRepeatChores={uniqRepeatChores}/>
                    ))}
                </div>
                <div className="userSection">
                    <h2 className="heading">Users</h2>
                    {kids.map((user)=>
                    <User user={user} users={users} uniqRepeatChores={uniqRepeatChores}/>)}
                </div>
    </div>
}

export default UsersPage