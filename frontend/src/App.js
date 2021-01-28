import { Switch, Route } from "react-router-dom";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Authentication, useAuth } from "./utils/Auth.js";
import { useEffect } from "react/cjs/react.development";
import { NavBar } from "./components/NavBar.js";
import { LoginForm } from "./components/LoginForm.js";
import { PhotosDisplay } from "./components/PhotosDisplay.js";
import { useRef } from 'react';

const FileUploader = () => {
  const file = useRef();

  const handleFileInput = (event) => {
    console.log("FileUploader::handleFileInput");
    file.current = event.target.files[0];
  }

  const submitFile = (event) => {
    console.log("FileUploader::submitFile");
    if (!file.current) {
      return alert("You didn't choose any file.");
    }

    const formData = new FormData();
    formData.append("super-file", file.current);

    const options = {
      method: "POST",
      body: formData
    }

    fetch('http://localhost:50002/upload', options)
      .then(response => response.json())
      .then(json => alert(json.msg))
      .catch(err => {
        alert(err.message);
      });
  }

  return (
    <div>
      <input type="file" name="super-file" onChange={handleFileInput} />
      <button onClick={submitFile}>Send</button>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Authentication>
        <Switch>
          <UnauthenticatedRoute exact path="/" redirect="/photos">
            <FileUploader />
          </UnauthenticatedRoute>

          <AuthenticatedRoute exact path="/photos" redirect="/">
            <NavBar />
            <PhotosDisplay />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/about">
            <NavBar />
            <h1>About</h1>
          </AuthenticatedRoute>
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
