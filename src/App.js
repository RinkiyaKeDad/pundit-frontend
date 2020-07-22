import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContext from './context/UserContext';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Header />
            </Grid>
            <Grid item container>
              <Grid item xs={0} sm={2} />
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route path='/' component={Home} exact />
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                </Switch>
              </Grid>
              <Grid item xs={0} sm={2} />
            </Grid>
          </Grid>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
