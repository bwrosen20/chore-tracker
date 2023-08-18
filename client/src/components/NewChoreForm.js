import {useState} from 'react'

function NewChoreForm({onNewChore}){

const [formData,setFormData]=useState({
    title:"",
    description:"",
    point_value:"",
    due_date:"",
    repeat_every:"",
    cycle_between:"",
    participants:""
})
const [image,setImage]=useState(null)
const [errors,setErrors]=useState([])


function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
    console.log(formData)
}

function handleSubmit(event){
    event.preventDefault()
    const newDate = new Date(formData.due_date)
    const offset = (newDate.toString()).slice(28,33)
    const date = `${formData.due_date} ${offset}`

    const data = new FormData()
        data.append('title',formData.title)
        data.append('description',formData.description)
        data.append('point_value',parseInt(formData.point_value))
        data.append('due_date',date)
        for (let i = 0; i<(formData.repeat_every).length; i++){
            data.append('repeat_every[]',formData.repeat_every[i])
        }
        for (let i = 0; i<(formData.participants).length; i++){
            data.append('participants[]',formData.participants[i])
        }
        data.append('cycle_between',(formData.cycle_between==="true"?true:false))
        if (image){data.append('image',image)}
    fetch('/chores',{
        method:"POST",
        body:data
    })
    .then(r=>{
        if ((r).ok){
            r.json().then((res)=>onNewChore(res))
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
    value={formData.title}
    placeholder="Title"
    onChange={handleChange}
    />
     <input
    rows="5"
    name="description"
    value={formData.description}
    placeholder="Description"
    onChange={handleChange}
    />
    <input
    type="text"
    name="point_value"
    value={formData.point_value}
    placeholder="Point Value"
    onChange={handleChange}
    />
    <label>Due Date</label>
    <input 
    type="datetime-local"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
    />
    
   <input
    type="file"
    accept="image/*"
    onChange={(e)=>setImage(e.target.files[0])}
   />
   <button>Submit</button>
   </form>
   {errors.map((error)=>(<error key={error}>{error}</error>))}
</div>

}

export default NewChoreForm