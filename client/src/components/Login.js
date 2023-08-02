import {useState} from 'react'

function Login({onLoginClick,onLogin}){

    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const [errors,setErrors]=useState([])

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    function handleLogin(event){
        event.preventDefault()
        fetch('/login',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
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
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
            />
            <button>Login</button>
        </form>
        <button onClick={onLoginClick}>Return to Signup</button>
    </div>
}

export default Login