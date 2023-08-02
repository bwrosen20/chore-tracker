function Prize({prize}){
    return <div>
                <img src={prize.image} alt={prize.id}/>
                <h3>{prize.title}</h3>

    </div>
}

export default Prize