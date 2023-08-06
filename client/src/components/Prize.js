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

    function onClaimPrize(){
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


    return <div>
        {editPrize?
        <EditPrize prize={prize} onEditPrize={onEditPrize}/>:
        <div>
                <img src={prize.image} alt={prize.id}/>
                <h3>{prize.title}</h3>
                <h4>{prize.point_value} Points</h4>
                {user.admin?  
            <button onClick={()=>setEditPrize(!editPrize)}>Edit Prize</button>: 
            <button onClick={onClaimPrize}>Claim Prize</button>
            }
            </div>
    }
    </div>
}

export default Prize