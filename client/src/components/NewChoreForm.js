import {useState} from 'react'

function NewChoreForm({onNewChore}){


const [days,setDays]=useState(false)
const [formData,setFormData]=useState({
    title:"",
    description:"",
    point_value:"",
    due_date:"",
    repeat_every:""
})
const [image,setImage]=useState(null)

function handleOptionChange(event){
    console.log(event.target.value)
    if (event.target.value==="specificDays"){
        setDays(!days)
    }
    else{
        if (formData.repeat_every.includes(event.target.value)){
            setFormData({...formData,[formData.repeat_every]:formData.repeat_every.filter((data)=>(data!==event.target.value))})
        }
        else{
            setFormData({...formData,repeat_every:[...formData.repeat_every,(event.target.value)]})
        } 
    }
}

function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
}

function handleSubmit(event){
    event.preventDefault()
    const data = new FormData()
        data.append('title',formData.title)
        data.append('description',formData.description)
        data.append('point_value',parseInt(formData.point_value))
        data.append('due_date',formData.due_date)
        data.append('repeat_every',formData.repeat_every)
        if (image){data.append('image',image)}
    fetch('/chores',{
        method:"POST",
        body:data
    })
    .then(r=>{
        if ((r).ok){
            r.json().then((data)=>onNewChore(data))
        }
        else{
            r.json().then((err)=>console.log(err.errors))
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
    <label>Repeat</label>
{days ? <fieldset
    id="days"
    name="repeat"
    value={formData.repeat_every}
    onChange={handleOptionChange}>
       <input 
       type="checkbox"
       value="monday"/>
       <label>Monday</label>
       <input 
       type="checkbox"
       value="tuesday"/>
       <label>Tuesday</label>
       <input 
       type="checkbox"
       value="wednesday"/>
       <label>Wednesday</label>
      <input 
       type="checkbox"
       value="thursday"/>
       <label>Thursday</label>
       <input 
       type="checkbox"
       value="friday"/>
       <label>Friday</label>
       <input 
       type="checkbox"
       value="saturday"/>
       <label>Saturday</label>
       <input 
       type="checkbox"
       value="sunday"/>
       <label>Sunday</label>
       <button onClick={()=>setDays(!days)}>Return</button>
   </fieldset>:
   <select
   id="days"
   name="repeat"
   value={formData.repeat_every}
   onChange={handleOptionChange}>
   <option value="none" disabled>Repeat</option>
   <option value="once">Once</option>
   <option value="weekly">Weekly</option>
   <option value="monthly">Monthly</option>
   <option value="specificDays">Specific Days</option>
   </select>
   }
   <input
    type="file"
    accept="image/*"
    onChange={(e)=>setImage(e.target.files[0])}
   />
   <button>Submit</button>
   </form>
</div>

}

export default NewChoreForm