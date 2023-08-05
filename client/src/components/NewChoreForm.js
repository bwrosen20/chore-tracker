import {useState} from 'react'

function NewChoreForm(){


const [days,setDays]=useState(false)

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

return <div>

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
   <option value="none">How many days</option>
   <option value="never">Never</option>
   <option value="weekly">Weekly</option>
   <option value="monthly">Monthly</option>
   <option value="specificDays">Specific Days</option>
   </select>
   }
</div>

}

export default NewChoreForm