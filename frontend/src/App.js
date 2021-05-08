
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Authentication, useAuth } from "./utils/Auth.js";
import { useEffect } from "react/cjs/react.development";
import { NavBar } from "./components/NavBar.js";
import { LoginForm } from "./components/LoginForm.js";
import { PhotosDisplay } from "./components/PhotosDisplay.js";
import { Explore } from "./components/Explore.js";
import { About } from "./components/About.js"
import { ErrorPage } from "./components/ErrorPage.js";

import FocusBackground from './components/FocusBackground';

const App = () => {
  return (
    <div>
      <Authentication>
        <Switch>
          <UnauthenticatedRoute exact path="/" redirect="/home">
            <LoginForm />
          </UnauthenticatedRoute>

          <AuthenticatedRoute exact path="/home" redirect="/">
            <FocusBackground />
            <NavBar />
            <PhotosDisplay />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/about">
            <NavBar />
            <About />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/explore">
            <NavBar />
            <Explore />
          </AuthenticatedRoute>

          <Route path="/">
            <ErrorPage />
          </Route>

        </Switch>
      </Authentication>
    </div>
  );
};

const AuthenticatedRoute = ({ children, redirect, ...props }) => {
  const auth = useAuth();
  useEffect(() => {
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
