import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import EditUser from './pages/EditUser';
import Credits from './pages/Credits';

export default function src() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/credits' exact component={Credits}/>
        <Route path='/dashboard' exact component={Dashboard}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/edituser/:id' exact component={EditUser}/>
      </Switch>
    </BrowserRouter>
  );
}
