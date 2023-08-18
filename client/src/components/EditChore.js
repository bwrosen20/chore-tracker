import {useState} from 'react'

function EditChore({onEditChore, chore, returnFromEditChore,users}){

    const time=(new Date(chore.due_date)).toTimeString().slice(0,8)
    const date=(chore.due_date.slice(0,11)+time)
    const userArray=users.filter((member)=>(!member.admin))
    const admin = users.find((member)=>member.admin)

    const [formData,setFormData]=useState({
        title:chore.title,
        description:chore.description,
        point_value:chore.point_value,
        due_date:date,
        participant:chore.user_id
    })
    
    const [image,setImage]=useState(null)
    const [errors,setErrors]=useState([])
    const [loading,setLoading]=useState(false)




    function handleChange(event){
        console.log(event.target)
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    function handleSubmit(event){
        setLoading(true)
        event.preventDefault()
        const data = new FormData()
        const newDate = new Date(formData.due_date.toString())
        const offset = (newDate.toString()).slice(28,33)
        const date = `${formData.due_date.toString()} ${offset}`
            data.append('title',formData.title)
            data.append('description',formData.description)
            data.append('point_value',parseInt(formData.point_value))
            data.append('due_date',date)
            data.append('participant',parseInt(formData.participant))
            if (image){data.append('image',image)}
        fetch( `chores/${chore.id}`,{
            method:"PATCH",
            body:data
        })
        .then(r=>{
            if ((r).ok){
                r.json().then((res)=>onEditChore(res))
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
        <label>Due Date</label>
        <input 
        type="datetime-local"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        />
        <label>Reassign</label>
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
        <label>Choose new image</label>
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


