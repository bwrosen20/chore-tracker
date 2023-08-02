import Prize from './Prize'

function PrizePage({users}){

    const admin = users.find((member)=>(member.admin))

    return <div>
        <h1>Available Prizes</h1>
        {admin.prizes.map((prize)=>(
            <Prize prize={prize} />
        ))}
    </div>
}

export default PrizePage