import {useState} from 'react'

function NewPrizeForm({handleNewPrize}){
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        point_value:"",
        how_many_claims:""
    })
    const [image,setImage]=useState(null)
    const [errors,setErrors]=useState([])

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
        console.log(formData)
    }

    function handleSubmit(event){
        event.preventDefault()
        setErrors([])
        const data= new FormData()
        data.append('title',formData.title)
        data.append('description',formData.description)
        data.append('point_value',parseInt(formData.point_value))
        data.append('how_many_claims',formData.how_many_claims)
        if (image){data.append('image',image)}
        fetch("/repeat_prizes",{
            method: "POST",
            body: data,
        })
            .then((r)=>{
                if (r.ok){
                    r.json().then((data)=>console.log(data))
                }
                else{
                    r.json().then((err)=>setErrors(err.errors))
                }
            })

    }


    return <div>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}/>
            <input 
            rows="5"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}/>
            <input 
            type="number"
            autoComplete="off"
            name="point_value"
            placeholder="Point Value"
            value={formData.point_value}
            onChange={handleChange}/>
            <label>How many claims?</label>
            <select 
            name="how_many_claims"
            value={formData.how_many_claims}
            onChange={handleChange}
            >
            <option value="no">How Many Claims?</option>
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
            <input 
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <button>Submit</button>
        </form>
        <button onClick={handleNewPrize}>Return</button>
    </div>
}

export default NewPrizeForm