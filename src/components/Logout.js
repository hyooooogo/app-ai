import React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // ログアウト成功時にisLoggedInをfalseに設定
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      navigate('/login');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>ログアウト</h1>
      <p style={{ fontSize: 'small' }}>ログアウトしますか？</p>
      <button
        style={{
          width: '150px',
          height: '40px',
          backgroundColor: '#008dc2',
          border: 'none',
          color: '#f1f1f1',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
};

export default Logout;