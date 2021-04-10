import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Components/Signin";
import SignUp from "./Components/Signup";
import PrimarySearchAppBar from "./Components/SearchAppBar";
import { useCookies } from "react-cookie";
import TeacherGrid from "./Components/TeacherGrid";
import AddTeacher from "./Components/AddTeacher";
import TeacherDetail from "./Components/TeacherDetail";
import TeacherSearchBar from "./Components/TeacherSearchBar";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const showBar = false;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/home">
            <PrimarySearchAppBar showBar={true}></PrimarySearchAppBar>
            <TeacherSearchBar></TeacherSearchBar>
            <TeacherGrid></TeacherGrid>
          </Route>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/addteacher">
            <PrimarySearchAppBar showBar={false}></PrimarySearchAppBar>
            <AddTeacher></AddTeacher>
          </Route>
          <Route path="/detail">
            <PrimarySearchAppBar showBar={false}></PrimarySearchAppBar>
            <TeacherDetail></TeacherDetail>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
