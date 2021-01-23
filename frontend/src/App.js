import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Authentication, useAuth } from './utils/Auth.js';
import { LoginForm } from './components/LoginForm.js';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="public">public</Link></li>
          <li><Link to="private">private</Link></li>
          <li><Link to="/">home</Link></li>
        </ul>
      </nav>
      <Authentication>
      <AuthButton />
        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>

          <AuthenticatedRoute path="/private">
            <PrivatePage />
          </AuthenticatedRoute>

          <UnauthenticatedRoute path="/">
            <LoginForm />
          </UnauthenticatedRoute>
        </Switch>
      </Authentication>
    </div>
  );
}

const PublicPage = () => {
  return <h1>Public Page</h1>;
}

const PrivatePage = () => {
  const auth = useAuth();

  return <h1>Hello {auth.user.displayName}</h1>;
}

const AuthButton = (props) => {
  const auth = useAuth();

  if (auth.user) {
    return (<button onClick={() => auth.logout()}>Logout</button>);
  }
  return null;
}

const AuthenticatedRoute = ({ children, ...props }) => {
  const auth = useAuth();

  const render = ({location}) => {
    if (!auth.user) {
      return <Redirect to = {{pathname: "/", state: {from: location}}} />
    }
    return children;
  }

  return (
    <Route {...props} render={render}/>
  )
}

const UnauthenticatedRoute = ({ children, ...props }) => {
  const auth = useAuth();

  const render = ({location}) => {
    if (auth.user) {
      return <Redirect to = {{pathname: "/private", state: {from: location}}} />
    }
    return children;
  }

  return (
    <Route {...props} render={render}/>
  )
}

export default App;