import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute component that checks for authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // Redirect to login page, but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
