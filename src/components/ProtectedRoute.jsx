
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  const jwt = localStorage.getItem('jwt');

  if (!email || !username || !jwt) {
    return <Navigate to="/Errorpage" />;
  }

  return element;
};

export default ProtectedRoute;
