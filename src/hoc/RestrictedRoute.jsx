import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Kullanıcı giriş yaptıysa ana sayfaya yönlendir
  return isLoggedIn ? <Navigate to="/contacts" /> : children;
};

export default RestrictedRoute;
