import { Switch, Route } from "react-router-dom";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Authentication, useAuth } from "./utils/Auth.js";
import { useEffect } from "react/cjs/react.development";
import { NavBar } from "./components/NavBar.js";
import { LoginForm } from "./components/LoginForm.js";
import { PhotosDisplay } from "./components/PhotosDisplay.js";
import { Explore } from "./components/Explore.js";

const App = () => {
  return (
    <div>
      <Authentication>
        <Switch>
          <UnauthenticatedRoute exact path="/" redirect="/home">
            <LoginForm />
          </UnauthenticatedRoute>

          <AuthenticatedRoute exact path="/home" redirect="/">
            <NavBar />
            <PhotosDisplay />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/about">
            <NavBar />
            <h1>About</h1>
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/explore">
            <NavBar />
            <Explore />
          </AuthenticatedRoute>

          <Route path="/">
            <Redirect to="/" />
          </Route>

        </Switch>
      </Authentication>
    </div>
  );
};

const AuthenticatedRoute = ({ children, redirect, ...props }) => {
  const auth = useAuth();
  useEffect(() => {
    console.log("Checking the token.");
    auth.check();
  });

  const render = ({ location }) => {
    if (!auth.user) {
      return (
        <Redirect to={{ pathname: redirect, state: { from: location } }} />
      );
    }
    return children;
  };

  return <Route {...props} render={render} />;
};

const UnauthenticatedRoute = ({ children, redirect, ...props }) => {
  const auth = useAuth();

  const render = ({ location }) => {
    if (auth.user) {
      return (
        <Redirect to={{ pathname: redirect, state: { from: location } }} />
      );
    }
    return children;
  };

  return <Route {...props} render={render} />;
};

export default App;
