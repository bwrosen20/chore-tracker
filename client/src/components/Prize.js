import {UserContext} from './App'
import {useContext, useState} from 'react'
import EditPrize from './EditPrize'

function Prize({prize,handleEditPrize}){

    const user = useContext(UserContext)
    const [editPrize,setEditPrize]=useState(false)

    function onEditPrize(data){
        setEditPrize(!editPrize)
        handleEditPrize(data)
    }


    return <div>
        {editPrize?
        <EditPrize prize={prize} onEditPrize={onEditPrize}/>:
        <div>
                <img src={prize.image} alt={prize.id}/>
                <h3>{prize.title}</h3>
                <h4>{prize.point_value} Points</h4>
                {user.admin? <div> 
            <button onClick={()=>setEditPrize(!editPrize)}>Edit Prize</button>
        </div> : 
        <div> 
            <button>Claim Prize</button>
            </div>}
            </div>
    }
    </div>
}

export default Prize