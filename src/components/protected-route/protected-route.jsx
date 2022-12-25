import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectIsUserAuthorized } from '../../utils/selectors';

function ProtectedRoute({ children, component, nonAuthOnly = false, ...rest }) {
  const isAuthorized = useSelector(selectIsUserAuthorized);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthorized ? (
          nonAuthOnly ? (
            <Redirect to={location.state?.from ?? '/'} />
          ) : (
            children ?? React.createElement(component)
          )
        ) : nonAuthOnly ? (
          children ?? React.createElement(component)
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  nonAuthOnly: PropTypes.bool,
  component: PropTypes.elementType,
};
export default ProtectedRoute;
