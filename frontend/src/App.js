import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import LogsAddLog from "./components/logs-add-log";
import OrgsList from "./components/orgs-list";
import ShowGraphs from "./components/show-graph";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand mx-5">
          Harvest
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
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
          <li className="nav-item">
            <Link to={"/organisations"} className="nav-link">
              Organisations
            </Link>
          </li>
        <li className="nav-item">
            <Link to={"/show-graph"} className="nav-link">
              Graphs
            </Link>
          </li>
        </div>
      </nav>
      <div className="mt-3 mx-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
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
              <Login {...props} login={login} />
            )}
          />
          <Route 
            path="/logs"
            render={(props) => (
              <LogsAddLog {...props} user={user} />
            )}
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
              <ShowGraphs {...props} user={user} />
            )}
          />

        </Switch>
      </div>
    </div>
  );
}

export default App;