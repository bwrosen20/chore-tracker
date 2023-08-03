import {useState} from 'react'

function EditPrize({prize,onEditPrize}){

    const [formData,setFormData]=useState({
        title:prize.title,
        point_value:prize.point_value,
        image:null
    })

    function handleEditChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        const data = new FormData()
        data.append('title',formData.title)
        data.append('point_value',formData.point_value)
        if (formData.image){data.append('image',formData.image)}
        fetch(`/prizes/${prize.id}`,{
            method:"PATCH",
            body:data
        })
        .then((r)=>{
            if (r.ok){
                r.json().then(data=>onEditPrize(data))
            }
            else{
                r.json().then(err=>console.log(err.errors))
            }
        })
    }

    return <div>

        <form onSubmit={handleSubmit}>
            <input 
            type="file"
            name="image"/>
             <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleEditChange}/>
            <input 
            type="text"
            name="point_value"
            value={formData.point_value}
            onChange={handleEditChange}/>
            <button>Confirm</button>
        </form>


        
            
    </div>
}

export default EditPrize