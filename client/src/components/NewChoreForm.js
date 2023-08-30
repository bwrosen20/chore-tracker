import {useState, useContext} from 'react'
import {UserContext} from './App'

function NewChoreForm({onNewChore, users}){

const admin = useContext(UserContext)
const [formData,setFormData]=useState({
    title:"",
    description:"",
    point_value:"",
    due_date:"",
    participant:admin.id
})
const [image,setImage]=useState(null)
const [errors,setErrors]=useState([])
const userArray=users.filter((member)=>(!member.admin))


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
        data.append('participant',parseInt(formData.participant))
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

return <div className="newChoreForm">
<form onSubmit={handleSubmit}>
    <label>Title: </label>
    <br></br>
    <input
    type="text"
    name="title"
    value={formData.title}
    placeholder="Title"
    onChange={handleChange}
    />
    <br></br>
    <label>Description: </label>
    <br></br>
     <textarea
    rows="3"
    name="description"
    value={formData.description}
    placeholder="Description"
    onChange={handleChange}
    />
     <br></br>
    <label>Point Value: </label>
    <br></br>
    <input
    type="text"
    name="point_value"
    value={formData.point_value}
    placeholder="Point Value"
    onChange={handleChange}
    />
     <br></br>
    <label>Due Date: </label>
    <br></br>
    <input 
    type="datetime-local"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
    />
    <br></br>
    <label>Assign: </label>
    <br></br>
    <select
    name="participant"
    value={formData.participant}
    onChange={handleChange}
    >
        <option
        value={admin.id}
        >
            Up For Grabs
        </option>
    {userArray.map((member)=>(
        <option
        value={member.id}>
            {member.username}
        </option>
    ))}
    </select>
    <br></br>
    <label>Image: </label>
    <br></br>
   <input
    type="file"
    accept="image/*"
    onChange={(e)=>setImage(e.target.files[0])}
   />
   <br></br>
   <br></br>
   <a className="cardButton" onClick={handleSubmit}>Submit</a>
   </form>
   <div className="errorContainer">
        {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
   </div>
</div>

}

export default NewChoreForm