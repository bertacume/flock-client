import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const isLogged = () => {
  const res = localStorage.getItem('token');
  return res;
}

const Guard = ({component: Component}, ...rest) => (
  <Route {...rest} render={(props) => (
    (isLogged()) ?
      <Component {...props} />
    :
      <Redirect to="/auth" />
  )} />
)


export default Guard;