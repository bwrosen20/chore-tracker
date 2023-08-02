function Chore({chore}){

    return <div>
        <div>
                <img src={chore.image} alt={chore.id}/>
                <h3>{chore.title}</h3>
                <h3>{chore.point_value} points</h3>
            </div>
    </div>
}

export default Chore