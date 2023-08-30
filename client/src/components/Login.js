import {useState} from 'react'

function Login({onLoginClick,onLogin}){

    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const [errors,setErrors]=useState([])
    const [loading,setLoading]=useState(false)

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    function handleLogin(event){
        setLoading(true)
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
                r.json().then((data)=>onLogin(data,formData.email))
                setLoading(false)
            }
            else{
                r.json().then((err)=>setErrors(err.errors))
                setLoading(false)
            }
        })
    }


    return <div className="loginCard">
        <form onSubmit={handleLogin}>
            <label>Email: </label>
            <br></br>
            <input
                autoFocus
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
            />
            <br></br>
            <label>Password: </label>
            <br></br>
            <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
            />
            <br></br>
            <br></br>
            <button className="cardButton" onClick={handleLogin}>{loading ? "Loading..." : "Login"}</button>
        </form>
        <div className="return" onClick={onLoginClick}>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className="errorContainer">
                {errors.map((error)=>(<div className="error"><error key={error}>{error}</error><br/></div>))}
        </div>
    </div>
}

export default Login