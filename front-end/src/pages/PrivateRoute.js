import React from 'react';

import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';

const PrivateRoute = (props) => {
  const isLogged = !!localStorage.getItem('token');
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Link>
      <Redirect to="/login" />
    </Link>
  );
};

export default PrivateRoute;
