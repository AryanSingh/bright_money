import React from 'react';
import logo from './logo.svg';
import Dashboard from './containers/Dashboard';
import Signup from './containers/Bill';
import Signin from './containers/Signin';
import StudentProfile from './containers/StudentProfile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { withCookies, Cookies } from 'react-cookie';

import './App.css';

function PrivateRoute({ children, ...rest }) {
  let cookie = new Cookies();
  if (cookie.get('login')) {
    return <Route {...rest} render={({ location }) => children} />;
  }
  return <Redirect to="/signup" />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Route>
          {/*<Route exact path="/signup">*/}
          {/*<ErrorBoundary>*/}
          {/*<Signup />*/}
          {/*</ErrorBoundary>*/}
          {/*</Route>*/}
          {/*<Route exact path="/signin">*/}
          {/*<ErrorBoundary>*/}
          {/*<Signin />*/}
          {/*</ErrorBoundary>*/}
          {/*</Route>*/}
          <PrivateRoute exact path="/dashboard">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </PrivateRoute>
          {/*<PrivateRoute exact path="/:id">*/}
          {/*<ErrorBoundary>*/}
          {/*<StudentProfile />*/}
          {/*</ErrorBoundary>*/}
          {/*</PrivateRoute>*/}
          {/*<Route exact path="/:id">*/}
          {/*<ErrorBoundary>*/}
          {/*<StudentProfile />*/}
          {/*</ErrorBoundary>*/}
          {/*</Route>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
