import {useState} from 'react'

function CreateAccount({onLogin,onCreateClick}){

    const [data,setData]=useState({
        username:"",
        email:"",
        groupName:"",
        password:"",
        confirmPassword:"",
    })
    const [profileImage,setProfileImage]=useState(null)
    const [errors,setErrors]=useState([])
    const [loading,setLoading]=useState(false)

    function handleChange(event){
        setData({...data,[event.target.name]:event.target.value})
        console.log(data)
    }

    function onFormSubmit(event){
        setLoading(true)
        event.preventDefault()
        setErrors([])
        const formData= new FormData()
        formData.append('username',data.username)
        formData.append('email',data.email)
        formData.append('group_name',data.groupName)
        formData.append('password',data.password)
        formData.append('password_confirmation',data.confirmPassword)
        if (profileImage){formData.append('profile_image',profileImage)}
        fetch("/createAccount",{
            method: "POST",
            body: formData,
        })
            .then((r)=>{
                if (r.ok){
                    r.json().then((res)=>onLogin(res,data.email))
                    setLoading(false)
                }
                else{
                    r.json().then((err)=>setErrors(err.errors))
                    setLoading(false)
                }
            })

    }

    return <div className="loginCard">
        <form onSubmit={onFormSubmit}>
            <label>Name: </label>
            <br></br>
            <input
            autoFocus
            type="text"
            placeholder="Name"
            name="username"
            autoComplete="off"
            value={data.username}
            onChange={handleChange}/>
            <br></br>
            <label>Email: </label>
            <br></br>
            <input
            type="text"
            placeholder="Email Address"
            name="email"
            autoComplete="off"
            value={data.email}
            onChange={handleChange}/>
            <br></br>
            <label>Group Name: </label>
            <br></br>
            <input
            type="text"
            placeholder="Group Name"
            name="groupName"
            autoComplete="off"
            value={data.groupName}
            onChange={handleChange}/>
            <br></br>
            <label>Password: </label>
            <br></br>
            <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={data.password}
            onChange={handleChange}/>
            <br></br>
            <label>Confirm Password: </label>
            <br></br>
            <input
            style={data.confirmPassword.length>0 ? data.confirmPassword===data.password ? {backgroundColor:"rgb(104, 211, 113)"} : {backgroundColor:"rgb(211, 104, 104)"} : {backgroundColor:"white"} }
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="off"
            value={data.confirmPassword}
            onChange={handleChange}/>
            <br></br>
            <label>Profile Image: </label>
            <br></br>
            <input
            type="file"
            placeholder="Profile Image"
            name="profileImage"
            accept="image/*"
            onChange={(e)=>setProfileImage(e.target.files[0])}/>
            <br></br>
            <br></br>
            <button className="cardButton" onClick={onFormSubmit}>{loading ? "Loading..." : "Create Account"}</button>
        </form>
        <div className="return" onClick={onCreateClick}>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="errorContainer">
                {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
        </div>
      
    </div>
}

export default CreateAccount