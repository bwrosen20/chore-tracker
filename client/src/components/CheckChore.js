import {useState} from 'react'

function CheckChore({chore,onCheckChore,returnFromCheckChore}){

    const [formData,setFormData]=useState({
        comment:"",
        approved:""
    })
    const [errors,setErrors]=useState([])

    function handleChange(event){
        setFormData({...formData,approved:event.target.value})
        console.log(formData)
    }
    
    
    function handleSubmit(event){
        event.preventDefault()
        fetch('/checks',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                comment:formData.comment,
                chore_id:chore.id,
                approved:formData.approved})
        })
        .then(r=>{
            if (r.ok){
                r.json().then(data=>onCheckChore(data))
            }
            else{
                r.json().then(err=>setErrors(err.errors))
            }
        })
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={(e)=>setFormData({...formData,comment:e.target.value})}
            placeholder="Comment"
            />
            <br></br>
            <fieldset
            style={{border:"none"}}
            name="approved"
            value={formData.approved}
            onChange={handleChange}
            >
                <input
                type="radio"
                value="approved"
                defaultChecked = {formData.approved==("approved") ? true : false}
                />
                <label>Approve</label>
                <input
                type="radio"
                value="rejected"
                defaultChecked = {formData.approved==("rejected") ? true : false}
                />
                <label>Reject</label>
            </fieldset>
            <br></br>
            <div onClick={returnFromCheckChore}className="return">
                <i class="fa-solid fa-arrow-left"> Return</i>
            </div>
            <a className="cardButton" onClick={handleSubmit}>Submit</a>
        </form>
        {errors.map((error)=>(<error key={error}>{error}</error>))}
    </div>
}

export default CheckChore