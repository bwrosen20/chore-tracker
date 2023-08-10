import {useState} from 'react'
import UsersPage from './UsersPage'

function NewChoreForm({onNewChore,users}){

const dayArray=["once","day","week","month"]
const [days,setDays]=useState(false)
const [formData,setFormData]=useState({
    title:"",
    description:"",
    point_value:"",
    due_date:"",
    repeat_every:"",
    cycle_between:"",
    participants:""
})
const [showParticipants,setShowParticipants]=useState(false)
const userArray=users.filter((member)=>(!member.admin))
const [image,setImage]=useState(null)
const [errors,setErrors]=useState([])

function handleOptionChange(event){
    if (event.target.value!="once"){
        setShowParticipants(true)
    }
    else{
        setShowParticipants(false)
    }
    console.log(event.target.value)
    if (event.target.value==="specificDays"){
        setDays(!days)
    }
    else{
        if (dayArray.includes(event.target.value)){
            setFormData({...formData,repeat_every:[event.target.value]})
        }
        else if (formData.repeat_every.includes(event.target.value)){
            setFormData({...formData,repeat_every:(formData.repeat_every).filter((data)=>(data!=event.target.value))})
        }
        else{
            setFormData({...formData,repeat_every:[...(formData.repeat_every).filter((data)=>(!dayArray.includes(data))),(event.target.value)]})
        } 
    }
    
}

function handleParticipantChange(event){
    if (showParticipants){
        if (event.target.value==="upForGrabs")
            setFormData({...formData,participants:["upForGrabs"]})
        else if (formData.participants.includes(event.target.value)){
            setFormData({...formData,participants:formData.participants.filter((participant)=>(participant!=(event.target.value)))})
        }
        else{
            const participantArray=formData.participants.filter((participant)=>participant!=="upForGrabs")
            setFormData({...formData,participants:[...participantArray,event.target.value]})
        }
    }
    else{
        setFormData({...formData,participants:[event.target.value]})
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
        data.append('participants',formData.participants)
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
    <label>Repeat</label>
    {days ? <fieldset
    id="days"
    name="repeat_every"
    value={formData.repeat_every}
    onChange={handleOptionChange}>
       <input 
       type="checkbox"
       value="monday"
       checked={formData.repeat_every.includes('monday') ? true : false}/>
       <label>Monday</label>
       <input 
       type="checkbox"
       value="tuesday"
       checked={formData.repeat_every.includes('tuesday') ? true : false}/>
       <label>Tuesday</label>
       <input 
       type="checkbox"
       value="wednesday"
       checked={formData.repeat_every.includes('wednesday') ? true : false}/>
       <label>Wednesday</label>
      <input 
       type="checkbox"
       value="thursday"
       checked={formData.repeat_every.includes('thursday') ? true : false}/>
       <label>Thursday</label>
       <input 
       type="checkbox"
       value="friday"
       checked={formData.repeat_every.includes('friday') ? true : false}/>
       <label>Friday</label>
       <input 
       type="checkbox"
       value="saturday"
       checked={formData.repeat_every.includes('saturday') ? true : false}/>
       <label>Saturday</label>
       <input 
       type="checkbox"
       value="sunday"
       checked={formData.repeat_every.includes('sunday') ? true : false}/>
       <label>Sunday</label>
       <button onClick={()=>setDays(!days)}>Return</button>
   </fieldset>:
  <fieldset
    value={formData.repeat_every}
    onChange={handleOptionChange}
    name="repeat_every">
   <input
   type="radio"
   checked = {(formData.repeat_every.includes("once")||formData.repeat_every==="") ? true : false}
   value="once"/>
    <label>Once</label>
   <input
   type="radio"
   checked = {formData.repeat_every.includes("day") ? true : false}
   value="day"/>
    <label>Daily</label>
   <input
   type="radio"
   checked = {formData.repeat_every.includes("week") ? true : false}
   value="week"/>
    <label>Weekly</label>
   <input
   type="radio"
   checked = {formData.repeat_every.includes("month") ? true : false}
   value="month"/>
   <label>Monthly</label>
   <input
   type="radio"
   id="specificDays"
   checked={false}
   value="specificDays"/>
   <label for="specificDays">Choose Days</label>
   </fieldset>
   }
    {showParticipants ?
    <div>
   <fieldset
    value={formData.participants}
    onChange={handleParticipantChange}
    name="participants">
        <input
        type="checkbox"
        value="upForGrabs"
        checked={formData.participants.includes("upForGrabs")}
        />
        <label>Put up for grabs</label>
    {userArray.map((member)=>(
        <div>
        <input
        type="checkbox"
        checked={formData.participants.includes((member.id).toString()) ? true : false}
        value={member.id}/>
         <label>{member.username}</label>
         </div>
    ))}
   
   </fieldset>
   <fieldset
   name="cycle_between"
   onChange={handleChange}
   value={formData.cycle_between}>
   <input
    type="radio"
    name="cycle_between"
    checked={formData.cycle_between==="true" ? true : false}
    value="true"
    />
    <label>Cycle between users</label>
    <input
    type="radio"
    name="cycle_between"
    checked={formData.cycle_between==="false" ? true : false}
    value="false"
    />
    <label>Assign to all users at once</label>
    </fieldset>
   </div> :  
   <fieldset
    value={formData.participants}
    onChange={handleParticipantChange}
    name="participants">
        <input
        type="radio"
        value="upForGrabs"
        checked={formData.participants.includes("upForGrabs")}
        />
        <label>Put up for grabs</label>
    {userArray.map((member)=>(
        <div>
        <input
        type="radio"
        checked={formData.participants.includes((member.id).toString()) ? true : false}
        value={member.id}/>
         <label>{member.username}</label>
         </div>
    ))}
   
   </fieldset>
}
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