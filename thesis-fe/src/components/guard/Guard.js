import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const isLogged = (n) => {
  console.log('aaaa');
  const res = localStorage.getItem('logged');
  console.log(res);
  if (!res) {
    localStorage.setItem('logged',true);
    localStorage.setItem('id',0);
  }
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