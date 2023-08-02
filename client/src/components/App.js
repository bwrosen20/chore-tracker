import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import {useState} from 'react'
import {Route,Switch} from 'react-router-dom'




function App() {

  const [user,setUser]=useState(null)

  function handleLogin(user){
    setUser(user)
  }
  return (
    <div>
       <NavBar />
       <Switch>
          <Route exact path="/login">
            <CreateAccount onLogin={handleLogin}/>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
       </Switch>
    </div>
  );
}

export default App;
