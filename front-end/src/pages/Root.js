import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import PagesLogin from './Login/Login';
import PagesRegister from './Register/Register';
import PagesNotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PagesMyFormsList from './MyFormsList/MyFormsList';
import Feedbacks from './Feedbacks/Feedbacks';
import PagesHome from './Home/Home';
import PagesAnswersList from './AnswersList/AnswersList';
import PagesProfile from './Profile/Profile';
import PagesAllFormsList from './AdminPages/AllFormsList';
import PagesAllUsersList from './AdminPages/AllUsers';
import RespostaQuestionario from './RespostaQuestionario/RespostaQuestionario';
import FormRespondido from './FormRespondido/FormRespondido';
import CreateMyForms from './Create/Create';

const Root = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/myforms" component={PagesMyFormsList} />
        <PrivateRoute exact path="/create" component={CreateMyForms} />
        <PrivateRoute exact path="/allforms" component={PagesAllFormsList} />
        <PrivateRoute exact path="/allusers" component={PagesAllUsersList} />
        <PrivateRoute exact path="/answers/:id" component={PagesAnswersList} />
        <Route exact path="/register" component={PagesRegister} />
        <Route exact path="/login" component={PagesLogin} />
        <PrivateRoute exact path="/feedbacks/:id" component={Feedbacks} />
        <PrivateRoute exact path="/profile/:user_id" component={PagesProfile} />
        <Route exact path="/home" component={PagesHome} />
        <PrivateRoute exact path="/form/:id" component={RespostaQuestionario} />
        <PrivateRoute
          exact
          path="/formRespondido/:id/:user_id"
          component={FormRespondido}
        />
        <PrivateRoute component={PagesNotFound} />
      </Switch>
    </Router>
  );
};

export default Root;
