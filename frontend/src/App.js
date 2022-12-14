import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
// import Login from "./components/login";
import LogsAddLog from "./components/logs-add-logs";
import OrgsList from "./components/orgs-list";
import ShowGraphs from "./components/graphs-list";
import UserLogin from "./components/user-login";
import UserSignup from "./components/user-signup";

let validUsers = {
   "Jessie":"Jessie",
   "Matt":"Matt",
   "Xin":"Xin"
}

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    // console.log(user);
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  const checkLoggedIn = (props) => {
    if (user===null) {
      return <UserLogin {...props} login={login} validUsers={validUsers}/>
    }
    else{
      return <LogsAddLog {...props} user={user} />
    }
  }
  const checkLoggedInGraphs = (props) => {
    if (user===null) {
      return <UserLogin {...props} login={login} validUsers={validUsers}/>
    }
    else{
      return <ShowGraphs {...props} user={user} />
    }
  }

  console.log(user===null)
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand mx-5">
          <Link to={"/"} className="nav-link">
              Harvest
          </Link>
        </div>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li> */}
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} href="/login" className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.username}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}
          </li>
          <li className="nav-item">
            <Link to={"/logs"} className="nav-link">
              Logs
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/organisations"} className="nav-link">
              Organisations
            </Link>
          </li> */}
        <li className="nav-item">
            <Link to={"/show-graph"} className="nav-link">
              Graphs
            </Link>
          </li>
        </div>
      </nav>
      <div className="mt-3 mx-3">
        <Switch>
          <Route 
            exact path={["/organisations"]} 
            render={(props) => (
              <OrgsList {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <UserLogin {...props} login={login} validUsers={validUsers}/>
            )}
          />
          <Route 
            path="/signup"
            render={(props) => (
              <UserSignup {...props} validUsers={validUsers}/>
            )}
          />
          <Route 
            exact path={["/", "/logs"]} 
            
            render={
              (props) => (
                checkLoggedIn(props))
              }
          />
          <Route 
            path="/organisations"
            render={(props) => (
              <OrgsList {...props} user={user} />
            )}
          />
          <Route 
            path="/show-graph"
            render={(props) => (
              checkLoggedInGraphs(props)
            )}
          />

        </Switch>
      </div>
    </div>
  );
}

export default App;