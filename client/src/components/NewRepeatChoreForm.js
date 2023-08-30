import {useState} from 'react'

function NewChoreForm({onNewChore,users, returnFromForm}){

const dayArray=["once","day","week","month"]
const [days,setDays]=useState(false)
const [formData,setFormData]=useState({
    title:"",
    description:"",
    point_value:"",
    due_date:"",
    repeat_every:[],
    cycle_between:"",
    participants:[]
})
const [showParticipants,setShowParticipants]=useState(false)
const [showCycle,setShowCycle]=useState(true)
const userArray=users.filter((member)=>(!member.admin))
const [image,setImage]=useState(null)
const [errors,setErrors]=useState([])

function handleOptionChange(event){
        
    if (event.target.value!=="once" && formData.participants.length>1){
        setShowParticipants(true)
        setShowCycle(true)
    }
    else if (event.target.value!=="once" && formData.participants.length<=1){
        setShowParticipants(true)
        setShowCycle(false)
    }
    else{
        setFormData({...formData,participants:[]})
        setShowParticipants(false)
        setShowCycle(false)
    }
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
        if (event.target.value==="upForGrabs"){
            setFormData({...formData,participants:["upForGrabs"]})
            setShowCycle(false)
        }
        else if (formData.participants.includes(event.target.value)){
            setFormData({...formData,participants:formData.participants.filter((participant)=>(participant!=(event.target.value)))})
            if (formData.participants.length<=2){
                setShowCycle(false)
            }
        }
        else{
            const participantArray=formData.participants.filter((participant)=>participant!=="upForGrabs")
            setFormData({...formData,participants:[...participantArray,event.target.value]})
            if (formData.participants.length>0 && !formData.participants.includes("upForGrabs")){
                setShowCycle(true)
            }
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
    const newDate = new Date(formData.due_date.toString())
    const offset = (newDate.toString()).slice(28,33)
    const date = `${formData.due_date.toString()} ${offset}`
    console.log(date)

        data.append('title',formData.title)
        data.append('description',formData.description)
        data.append('point_value',parseInt(formData.point_value))
        data.append('time_due',date)
        for (let i = 0; i<(formData.repeat_every).length; i++){
            data.append('repeat_every[]',formData.repeat_every[i])
        }
        for (let i = 0; i<(formData.participants).length; i++){
            data.append('participants[]',formData.participants[i])
        }
        data.append('cycle_between',(formData.cycle_between==="true"?true:false))
        if (image){data.append('image',image)}
    fetch('/repeat_chores',{
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

return <div className="newRepeatChoreForm">
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
     <input
    rows="5"
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
    <label>First Due Date: </label>
    <br></br>
    <input 
    type="datetime-local"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
    />
    <br></br>
    <label>Repeat: </label>
    <br></br>
    {days ? <fieldset
    id="days"
    name="repeat_every"
    value={formData.repeat_every}
    onChange={handleOptionChange}>
       <input 
       type="checkbox"
       value={1}
       checked={formData.repeat_every.includes('1') ? true : false}/>
       <label>Monday</label>
       <input 
       type="checkbox"
       value={2}
       checked={formData.repeat_every.includes('2') ? true : false}/>
       <label>Tuesday</label>
       <input 
       type="checkbox"
       value={3}
       checked={formData.repeat_every.includes('3') ? true : false}/>
       <label>Wednesday</label>
      <input 
       type="checkbox"
       value={4}
       checked={formData.repeat_every.includes('4') ? true : false}/>
       <label>Thursday</label>
       <input 
       type="checkbox"
       value={5}
       checked={formData.repeat_every.includes('5') ? true : false}/>
       <label>Friday</label>
       <input 
       type="checkbox"
       value={6}
       checked={formData.repeat_every.includes('6') ? true : false}/>
       <label>Saturday</label>
       <input 
       type="checkbox"
       value={7}
       checked={formData.repeat_every.includes('7') ? true : false}/>
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
   <br></br>
    <label>Participants: </label>
    <br></br>
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
   {showCycle?
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
    </fieldset>:null
}
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
   <button className="cardButton">Submit</button>
   </form>
   <div className="errorContainer">
        {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
   </div>
</div>

}

export default NewChoreForm