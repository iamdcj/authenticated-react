import React, { useState } from "react";
import { Switch, Route, Link, useHistory, useLocation } from "react-router-dom";

import { Users } from "./Users/Users";
import { About } from "./About/about";
import { PrivateRoute } from "./Routing/PrivateRoute";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  let history = useHistory();
  let location = useLocation();

  const login = () => {
    fetch("http://www.mocky.io/v2/5e3ca2e32d00000e00d95893")
      .then(response => {
        return response.json();
      })
      .then(() => {
        const from = location.state.from.pathname || "/users";

        setAuthenticated(true);
        history.replace(from);
      })
      .catch(e => console.log(e.message));
  };

  return (
    <div className="App">
      <nav style={{ display: "flex", alignItems: "center" }}>
        <Link to="about" style={{ marginRight: "1em" }}>
          About
        </Link>
        <Link to="users">Users 🔐</Link>
        <div style={{ marginLeft: "auto", fontSize: "20px" }}>
          {!isAuthenticated ? (
            <button onClick={login}>Login 🗝</button>
          ) : (
            <button onClick={() => setAuthenticated(false)}>Logout 🗝</button>
          )}
        </div>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <PrivateRoute path="/users" isAuthenticated={isAuthenticated}>
          <Users />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
