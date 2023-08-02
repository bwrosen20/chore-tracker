import {useState} from 'react'

function Signup({onSignupClick, onLogin}){

    const [data,setData]=useState({
        username:"",
        email:"",
        groupName:"",
        password:"",
        confirmPassword:"",
        profileImage:null
    })
    const [errors,setErrors]=useState([])

    function handleChange(event){
        setData({...data,[event.target.name]:event.target.value})
    }

    function onFormSubmit(event){
        event.preventDefault()
        setErrors([])
        const formData= new FormData()
        formData.append('username',data.username)
        formData.append('email',data.email)
        formData.append('group_name',data.groupName)
        formData.append('password',data.password)
        formData.append('password_confirmation',data.confirmPassword)
        if (data.profileImage){formData.append('profile_image',data.profileImage)}
        fetch("/signup",{
            method: "POST",
            body: formData,
        })
            .then((r)=>{
                if (r.ok){
                    r.json().then((user)=>onLogin(user))
                }
                else{
                    r.json().then((err)=>setErrors(err.errors))
                }
            })

    }


    return <div>
       <form onSubmit={onFormSubmit}>
            <input
            type="text"
            placeholder="userName"
            name="userName"
            autoComplete="off"
            value={data.username}
            onChange={handleChange}/>

            <input
            type="text"
            placeholder="email"
            name="email"
            autoComplete="off"
            value={data.email}
            onChange={handleChange}/>

            <input
            type="text"
            placeholder="Group Name"
            name="groupName"
            autoComplete="off"
            value={data.groupName}
            onChange={handleChange}/>

            <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={data.password}
            onChange={handleChange}/>

            <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="off"
            value={data.confirmPassword}
            onChange={handleChange}/>

            <label for="files">Select File</label>
            <input
            type="file"
            placeholder="Profile Image"
            name="profileImage"
            value={data.profileImage}
            onChange={handleChange}/>
            <button>Create Account</button>
        </form>
        {errors.map((error)=>(<error key={error}>{error}</error>))}
        <button onClick={onSignupClick}>Return</button>
    </div>
}

export default Signup