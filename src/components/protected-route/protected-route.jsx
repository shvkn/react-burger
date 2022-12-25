import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectIsUserAuthorized } from '../../utils/selectors';

function ProtectedRoute({ children, ...rest }) {
  const isAuthorized = useSelector(selectIsUserAuthorized);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthorized ? (
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
