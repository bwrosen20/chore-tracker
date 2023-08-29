import {UserContext} from './App'
import {useContext, useState} from 'react'
import EditPrize from './EditPrize'

function Prize({prize,handleEditPrize,handleClaimPrize}){

    const user = useContext(UserContext)
    const [editPrize,setEditPrize]=useState(false)
    const [errors,setErrors]=useState([])

    function onEditPrize(data){
        setEditPrize(!editPrize)
        handleEditPrize(data)
    }

    function onClaimPrize(event){
        event.preventDefault()
        fetch(`/users/${user.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({prize_id:prize.id})
        })
        .then(r=>{
            if (r.ok){
                r.json().then(data=>handleClaimPrize(data))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }


    return <div className="PrizeCard">
        {editPrize?
        <EditPrize prize={prize} onEditPrize={onEditPrize}/>:
        <div>
                <img src={prize.image} alt={prize.id} className="PrizePicture"/>
                <h3 className="CenteredWords">{prize.title}</h3>
                <h4 className="CenteredWords">{prize.point_value} Points</h4>
                {user.admin?  
            <a className="cardButton" onClick={()=>setEditPrize(!editPrize)}>Edit Prize</a>: 
            user.prizes.includes(prize) ? null : <a className="cardButton" onClick={onClaimPrize}>Claim Prize</a>
            }
            </div>
        }
        {errors.map((error)=>(<error key={error}>{error}</error>))}
    </div>
}

export default Prize