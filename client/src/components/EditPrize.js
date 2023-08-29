import {useState} from 'react'

function EditPrize({prize,onEditPrize}){

    const [formData,setFormData]=useState({
        title:prize.title,
        point_value:prize.point_value,
        image:null
    })
    const [errors,setErrors]=useState([])

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
                r.json().then(res=>onEditPrize(res))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }

    return <div>

        <form onSubmit={handleSubmit}>
            <label>Title: </label>
             <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleEditChange}/>
            <br></br>
            <label>Point Value: </label>
            <br></br>
            <input 
            type="text"
            name="point_value"
            value={formData.point_value}
            onChange={handleEditChange}/>
            <br></br>
            <label>New Image: </label>
            <br></br>
            <input 
            type="file"
            name="image"/>
            <br></br>
            <br></br>
            <a className="cardButton" onClick={handleSubmit}>Confirm</a>
        </form>
        {errors.map((error)=>(<error key={error}>{error}</error>))}

        
            
    </div>
}

export default EditPrize