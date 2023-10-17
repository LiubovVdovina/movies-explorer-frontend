import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedRoute({element: Component, ...props}) {
  return(
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  element: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}