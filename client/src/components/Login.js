function Login({onLoginClick}){
    return <div>
        <form>
            <input
                type="text"
                placeholder="Username"
                name="username"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
            />
             <input
                type="text"
                placeholder="Group Name"
                name="groupName"
            />
            <button>Login</button>
        </form>
        <button onClick={onLoginClick}>Return to Signup</button>
    </div>
}

export default Login