import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Kullanıcı giriş yapmamışsa /login sayfasına yönlendir
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
