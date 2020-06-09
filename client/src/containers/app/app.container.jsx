import React, { Suspense, lazy } from 'react';

import { Switch, Route } from 'react-router-dom';

import AuthRoute from 'containers/auth-route/auth-route.container';
import PrivateRoute from 'containers/private-route/private-route.container';

import Loading from 'components/loading/loading.component';
import Header from 'components/header/header.component';

/* -------------------------------------------------------------------------- */

// Lazy loading
const Home = lazy(() => import('pages/home/home.page'));
const Register = lazy(() => import('pages/register/register.page'));
const Login = lazy(() => import('pages/login/login.page'));
const Dashboard = lazy(() => import('pages/dashboard/dashboard.page'));

const App = () => (
  <>
    <Header />

    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />

        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  </>
);

export default App;
