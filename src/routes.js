import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ActiveRegister from './pages/ActiveRegister';
import CompanyRegister from './pages/CompanyRegister';
import UnitRegister from './pages/UnitRegister';
import UserRegister from './pages/UserRegister';

import ActiveEdit from './pages/ActiveEdit';
import CompanyEdit from './pages/CompanyEdit';
import UnitEdit from './pages/UnitEdit';
import UserEdit from './pages/UserEdit';

import Active from './pages/Active';
import CompanyList from './pages/CompanyList';
import UnitList from './pages/UnitList';
import UserList from './pages/UserList';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/active_register" component={ActiveRegister} />
        <Route exact path="/company_register" component={CompanyRegister} />
        <Route exact path="/unit_register" component={UnitRegister} />
        <Route exact path="/user_register" component={UserRegister} />

        <Route exact path="/active_edit/:id" component={ActiveEdit} />
        <Route exact path="/company_edit/:id" component={CompanyEdit} />
        <Route exact path="/unit_edit/:id" component={UnitEdit} />
        <Route exact path="/user_edit/:id" component={UserEdit} />

        <Route exact path="/active/:id" component={Active} />
        <Route exact path="/" component={CompanyList} />
        <Route exact path="/units/:company_id" component={UnitList} />
        <Route exact path="/users" component={UserList} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;