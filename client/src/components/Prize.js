import {UserContext} from './App'
import {useContext, useState} from 'react'
import EditPrize from './EditPrize'

function Prize({prize,handleEditPrize,handleClaimPrize,handleDeletePrize,handleAwardPrize}){

    const user = useContext(UserContext)
    const [editPrize,setEditPrize]=useState(false)
    const [errors,setErrors]=useState([])
    const [youSure,setYouSure]=useState(false)

    function onEditPrize(data){
        setEditPrize(!editPrize)
        handleEditPrize(data)
    }

    function onDelete(){
        fetch( `/prizes/${prize.id}`,{
            method:"DELETE"
        })
        .then(handleDeletePrize(prize.id))
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

    function onAward(){
        fetch (`/award/${prize.id}`,{
            method:'PATCH'
        })
        .then(r=>{
            if (r.ok){
                r.json().then(data=>handleAwardPrize(data))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }


    return <div className="prizeCard">
        {editPrize?
        <EditPrize prize={prize} onEditPrize={onEditPrize}/>:
        <div>
                <img src={prize.image} alt={prize.id} className="prizePicture"/>
                <h3>{prize.title}</h3>
                {user.admin && prize.user_id!==user.id ? <h4>{prize.kid}</h4>:<h4>{prize.point_value} Points</h4>}
                {user.admin? 
                //User is admin
                    prize.user_id!==user.id?
                //Prize has been claimed
                    <div>
                        <button className="cardButton" onClick={onAward}>Award Prize</button>
                    </div>:
                //Prize has not been claimed
                    youSure ? 
                        <div>
                            <a className="deleteButton" onClick={onDelete} value="one">Delete</a>
                            <div onClick={()=>{setYouSure(false)}}className="return">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>:
                        <div>
                            <a className="cardButton" onClick={()=>setEditPrize(!editPrize)}>Edit Prize</a>
                            {<button className="delete" onClick={()=>setYouSure(true)} value="one">X</button>} 
                        </div>:


                //User is not admin
                user.prizes.includes(prize) ? null : <a className="cardButton" onClick={onClaimPrize}>Claim Prize</a>
                }
            </div>
        }
        <div className="errorContainer">
                {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
        </div>
    </div>
}

export default Prize