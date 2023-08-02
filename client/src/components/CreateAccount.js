import {useState} from 'react'
import Login from './Login'
import Signup from './Signup'

function CreateAccount({onLogin}){

    const [showLogin,setShowLogin]=useState(false)
    const [showSignUp,setShowSignUp]=useState(false)
    const [data,setData]=useState({
        username:"",
        email:"",
        groupName:"",
        password:"",
        confirmPassword:"",
        profileImage:null
    })
    const [errors,setErrors]=useState([])

    function onLoginClick(){
        setShowLogin(!showLogin)
    }

    function onSignupClick(){
        setShowSignUp(!showSignUp)
    }

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
        fetch("/createAccount",{
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
        {showSignUp?
        <Signup onSignupClick={onSignupClick} onLogin={onLogin}/>:
        showLogin?
        <Login onLoginClick={onLoginClick} onLogin={onLogin}/>:
        <div>
        <h1>Create A Group</h1>
        <form onSubmit={onFormSubmit}>
            <input
            type="text"
            placeholder="userName"
            name="userName"
            value={data.username}
            onChange={handleChange}/>
            <input
            type="text"
            placeholder="email"
            name="email"
            value={data.email}
            onChange={handleChange}/>
            <input
            type="text"
            placeholder="Group Name"
            name="groupName"
            value={data.groupName}
            onChange={handleChange}/>
            <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}/>
            <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
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
        <h2>Already have a group?</h2>
        <button onClick={onLoginClick}>Login</button>
        <h2>Have a group name from a parent/guardian?</h2>
        <button onClick={onSignupClick}>Sign up</button>
        </div>
        }
    </div>
}

export default CreateAccount