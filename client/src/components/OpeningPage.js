import Login from './Login'
import CreateAccount from './CreateAccount'
import Signup from './Signup'
import {useState} from 'react'


function OpeningPage({onLogin}){


    const [showLogin,setShowLogin]=useState(false)
    const [showSignUp,setShowSignUp]=useState(false)
    const [showCreate,setShowCreate]=useState(false)

    function onLoginClick(){
        setShowLogin(!showLogin)
    }

    function onSignupClick(){
        setShowSignUp(!showSignUp)
    }

    function onCreateClick(){
        setShowCreate(!showCreate)
    }

    return <div>
        <h1 className="mainHeading">Chore Tracker</h1>
        {showSignUp?
        <Signup onLogin={onLogin} onSignupClick={onSignupClick}/>:
        showLogin?
        <Login onLogin={onLogin} onLoginClick={onLoginClick}/>:
        showCreate?<CreateAccount onLogin={onLogin} onCreateClick={onCreateClick}/>:
        <div>
        <h1 className="loginOptionCreate" onClick={onCreateClick}>Create A Group</h1>
        <h4 className="smallerHeading">Have a group name from a parent/guardian?</h4>
        <a className="loginOptionSignup" onClick={onSignupClick}>Sign up</a>
        <h4 className="smallerHeading">Already have a group?</h4>
        <a className="loginOptionLogin" onClick={onLoginClick}>Login</a>
        </div>
        }
    </div>
}

export default OpeningPage