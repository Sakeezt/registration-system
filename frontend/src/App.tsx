import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Bills from "./components/Bill";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState } from 'react';
import SignIn from "./components/SignIn";
import Home from "./components/Home";
function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("uid");
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  if (!token) {
    return <SignIn />
  }
  return (
    <Router>
    <div>
      {token &&(
        <Fragment>
        <Navbar/>
        <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={Body} />
        <Route exact path="/history" component={Bills} />
        
        </Switch>
        </Fragment>
      )

      }
        
    </div>
    </Router>
  );
}

export default App;