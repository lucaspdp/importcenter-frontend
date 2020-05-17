import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import EditUser from './pages/EditUser';
import Credits from './pages/Credits';
import EditPost from './pages/EditPost';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch >
        <Route path='/' exact component={Login}/>
        <Route path='/credits' exact component={Credits}/>
        <Route path='/dashboard' exact component={Dashboard}/>
        <Route path='/admin' exact component={Admin}/>
        <Route path='/edituser/:id' exact component={EditUser}/>
        <Route path='/editpost/:id' exact component={EditPost} />
      </Switch>
    </BrowserRouter>
  );
}
