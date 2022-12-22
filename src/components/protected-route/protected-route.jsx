import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
