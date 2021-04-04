import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Components/Signin";
import SignUp from "./Components/Signup"
import PrimarySearchAppBar from "./Components/SearchAppBar"
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/home">
            <PrimarySearchAppBar></PrimarySearchAppBar>
          </Route>
          <Route exact path = "/signup">
            <SignUp></SignUp>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
