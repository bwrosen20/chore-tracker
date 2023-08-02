import '../App.css';
import NavBar from './NavBar'
import CreateAccount from './CreateAccount'
import Home from './Home'
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div>
       <NavBar />
       <Switch>
          <Route exact path="/login">
            <CreateAccount />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
       </Switch>
    </div>
  );
}

export default App;
