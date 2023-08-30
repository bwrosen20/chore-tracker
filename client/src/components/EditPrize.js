import {useState} from 'react'

function EditPrize({prize,onEditPrize}){

    console.log(prize)

    const [formData,setFormData]=useState({
        title:prize.title,
        point_value:prize.point_value,
        how_many_claims:prize.how_many_claims,
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
        data.append('how_many_claims',parseInt(formData.how_many_claims))
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
            <label>How many claims left?</label>
            <br></br>
            <select 
            name="how_many_claims"
            value={formData.how_many_claims}
            onChange={handleEditChange}
            >
            <option disabled value="no">How Many Claims?</option>
            <option value="100">Keep Until Deleted</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
            <br></br>
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
        <div className="errorContainer">
                {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
        </div>

        
            
    </div>
}

export default EditPrize