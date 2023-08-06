import {useState} from 'react'

function EditChore({onEditChore, chore}){

    const date=chore.due_date.split("").slice(0,16).join("")
    const dayArray=["once","day","week","month"]
    const [formData,setFormData]=useState({
        title:chore.title,
        description:chore.description,
        point_value:chore.point_value,
        due_date:date,
        repeat_every:chore.repeat_every
    })
    const [image,setImage]=useState(null)
    const [errors,setErrors]=useState([])
    const [days,setDays]=useState(!dayArray.includes(chore.repeat_every[0]))

    console.log(chore)
    console.log(formData)

    function handleOptionChange(event){
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
        for (let i = 0; i<(formData.repeat_every).length; i++){
            data.append('repeat_every[]',formData.repeat_every[i])
        }
        if (image){data.append('image',image)}
        fetch(`/chores/${chore.id}`,{
            method:"PATCH",
            body:data
        })
        .then(r=>{
            if (r.ok){
                r.json().then(res=>onEditChore(res))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }

    return <div>
        <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
    type="text"
    name="title"
    value={formData.title}
    placeholder="Title"
    onChange={handleChange}
    />
    <label>Description</label>
     <input
    rows="5"
    name="description"
    value={formData.description}
    placeholder="Description"
    onChange={handleChange}
    />
    <label>Point Value</label>
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
   checked = {formData.repeat_every.includes("once") ? true : false}
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
   checked={dayArray.includes(formData.repeat_every[0]) ? false : true}
   value="specificDays"/>
   <label for="specificDays">Choose Days</label>
   </fieldset>
   }
   <label>New Image</label>
   <input
    type="file"
    accept="image/*"
    onChange={(e)=>setImage(e.target.files[0])}
   />
   <button>Submit</button>
   </form>
        <button onClick={onEditChore}>Return</button>
        {errors.map((error)=>(<error key={error}>{error}</error>))}
    </div>
}

export default EditChore