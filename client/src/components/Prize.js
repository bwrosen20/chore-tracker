import {UserContext} from './App'
import {useContext, useState} from 'react'
import EditPrize from './EditPrize'

function Prize({prize,handleEditPrize,handleClaimPrize}){

    const user = useContext(UserContext)
    const [editPrize,setEditPrize]=useState(false)
    const [errors,setErrors]=useState([])
    const [youSure,setYouSure]=useState(false)

    function onEditPrize(data){
        setEditPrize(!editPrize)
        handleEditPrize(data)
    }

    function onDelete(event){
        console.log(event.target)
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
             
            user.prizes.includes(prize) ? null : <a className="cardButton" onClick={onClaimPrize}>Claim Prize</a>
            }
            </div>
        }
        {
                                }
        <div className="errorContainer">
                {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
        </div>
    </div>
}

export default Prize