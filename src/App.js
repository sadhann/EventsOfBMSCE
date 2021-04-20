import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NewEventMainPage from "./components/NewEventMainPage";
import EditEventMainPage from "./components/EditEventMainPage";
import { db, auth } from "./config/firebase";
import RegisteredUsersMainPage from "./components/RegisteredUsersMainPage";

function App() {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        db.collection("admin").onSnapshot((snap) => {
          const data = snap.docs.map((s) => s.data());
          data.map((e) => {
            if (user.email === e.email) {
              setIsUserAdmin(true);
            }
          });
        });
      } else {
        setIsUserAdmin(false);
      }
    });
  }, [auth]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home isUserAdmin={isUserAdmin} />
          </Route>
          <Route path="/create-event">
            {isUserAdmin ? <NewEventMainPage /> : <h1>Not authorised</h1>}
          </Route>
          <Route path="/edit-event">
            <EditEventMainPage />
          </Route>
          <Route path="/registered-users/:id">
            <RegisteredUsersMainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
