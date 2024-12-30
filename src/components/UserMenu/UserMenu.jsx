import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations'; // Logout işlemi
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user); // Redux state'den kullanıcı bilgisi alın

  const handleLogout = () => {
    dispatch(logout()); // Logout işlemini başlat
    navigate('/login'); // Kullanıcıyı giriş sayfasına yönlendir
  };

  return (
    <div className="user-menu">
      <p className="user-info">Welcome, {user?.name || 'User'}!</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
