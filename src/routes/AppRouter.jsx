import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { startLoading } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startLoading());
  }, [dispatch]);

  if (loading) {
    return <h3>wait...</h3>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path='/login'
            component={LoginScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path='/'
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};
