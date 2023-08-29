import {useState} from 'react'

function NewPrizeForm({onNewPrize}){
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
        data.append('how_many_claims',parseInt(formData.how_many_claims))
        if (image){data.append('image',image)}
        fetch("/prizes",{
            method: "POST",
            body: data,
        })
            .then((r)=>{
                if (r.ok){
                    r.json().then((res)=>onNewPrize(res))
                }
                else{
                    r.json().then((err)=>setErrors(err.errors))
                }
            })

    }


    return <div className="newPrizeForm">
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <br></br>
            <input 
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}/>
            <br></br>
            <label>Description:</label>
            <br></br>
            <textarea 
            rows="3"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}/>
            <br></br>
            <label>Point Value:</label>
            <br></br>
            <input 
            type="number"
            autoComplete="off"
            name="point_value"
            placeholder="Point Value"
            value={formData.point_value}
            onChange={handleChange}/>
            <br></br>
            <label>How many claims?</label>
            <br></br>
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
            <br></br>
            <label>Image:</label>
            <br></br>
            <input 
            type="file"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <a className="cardButton">Submit</a>
        </form>
        {errors.map((error)=>(<error key={error}>{error}</error>))}
    </div>
}

export default NewPrizeForm