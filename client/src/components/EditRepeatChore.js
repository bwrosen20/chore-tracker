import {useState} from 'react'

function EditChore({chore, users, returnFromEditChore, onEditRepeatChore}){

    const userArray=users.filter((member)=>(!member.admin))
    const dayArray=["once","day","week","month"]
    const [days,setDays]=useState(!dayArray.includes(chore.repeat_every[0]))
    const [formData,setFormData]=useState({
        title:chore.title,
        description:chore.description,
        point_value:chore.point_value,
        repeat_every:chore.repeat_every,
        cycle_between:(chore.cycle_between ? "true" : "false"),
        participants:chore.participants
    })
    const [showParticipants,setShowParticipants]=useState(!chore.repeat_every.includes("once"))
    const [showCycle,setShowCycle]=useState(true)
    const [image,setImage]=useState(null)
    const [errors,setErrors]=useState([])
    const [loading,setLoading]=useState(false)

    function handleOptionChange(event){
        
        if (event.target.value!=="once"){
            setShowParticipants(true)
            setShowCycle(true)
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
        console.log(formData.participants)
    }

    function handleParticipantChange(event){
        
        if (showParticipants){
            if (event.target.value==="upForGrabs"){
                setFormData({...formData,participants:["upForGrabs"]})
                setShowCycle(false)
            }
            else if (formData.participants.includes(event.target.value)){
                setFormData({...formData,participants:formData.participants.filter((participant)=>(participant!=(event.target.value)))})
                
            }
            else{
                const participantArray=formData.participants.filter((participant)=>participant!=="upForGrabs")
                setFormData({...formData,participants:[...participantArray,event.target.value]})
                setShowCycle(true)
            }
        }
        else{
            setFormData({...formData,participants:[event.target.value]})
        }
        console.log(formData.participants)
    }

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    function handleSubmit(event){
        setLoading(true)
        event.preventDefault()
        const data = new FormData()
            data.append('title',formData.title)
            data.append('description',formData.description)
            data.append('point_value',parseInt(formData.point_value))
            for (let i = 0; i<(formData.repeat_every).length; i++){
                data.append('repeat_every[]',formData.repeat_every[i])
            }
            for (let i = 0; i<(formData.repeat_every[0]==="once"?1:(formData.participants.length)); i++){
                data.append('participants[]',formData.participants[i])
            }
            data.append('cycle_between',(formData.cycle_between==="true"?true:false))
            if (image){data.append('image',image)}
        fetch( `repeat_chores/${chore.id}`,{
            method:"PATCH",
            body:data
        })
        .then(r=>{
            if ((r).ok){
                r.json().then((res)=>onEditRepeatChore(res))
                setLoading(false)
            }
            else{
                r.json().then((err)=>setErrors(err.errors))
                setLoading(false)
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
        <label>Repeat</label>
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
            checked={formData.participants[0]===((member.id).toString()) ? true : false}
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
    <button>{loading ? "Loading..." : "Submit"}</button>
    </form>
    <button onClick={returnFromEditChore}>Return</button>
    {errors.map((error)=>(<error key={error}>{error}</error>))}
    </div>
    
   
}

export default EditChore

