import {useState} from 'react'

function NewPrizeForm({handleNewPrize}){


    const [formData,setFormData]=useState({
        title:"",
        description:"",
        point_value:0,
        repeat_every:[]
    })
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

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
        console.log(formData)
    }


    return <div>
        <form>
            <input 
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}/>
            <input 
            type="text"
            rows="5"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}/>
            <input 
            type="text"
            name="point_value"
            value={formData.point_value}
            onChange={handleChange}/>
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
            </fieldset>:
            <select
            id="days"
            name="repeat"
            value={formData.repeat_every}
            onChange={handleOptionChange}>
            <option value="none">Select option</option>
            <option value="never">Never</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="specificDays">Specific Days</option>
            </select>
            }
        </form>
        <button onClick={handleNewPrize}>Return</button>
    </div>
}

export default NewPrizeForm