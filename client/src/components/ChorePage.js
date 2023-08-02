import Chore from './Chore'

function ChorePage({users}){

    const admin=users.find((member)=>member.admin)

    return <div>
        <h1>Get Some Extra Points</h1>
        {admin.chores.map((chore)=>(
            <div>
                <Chore chore={chore}/>
            </div>
        ))}
    </div>
}

export default ChorePage