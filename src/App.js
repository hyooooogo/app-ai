import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebaseConfig';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setDisplayName(user.displayName || '匿名ユーザー');
      } else {
        setIsLoggedIn(false);
        setDisplayName('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '10%' }}>
          <Header isLoggedIn={isLoggedIn} displayName={displayName} />
        </div>
        <div style={{ height: '90%', display: 'flex' }}>
          <div style={{ width: '30%' }}>
            <Nav isLoggedIn={isLoggedIn} />
          </div>
          <div style={{ width: '90%', height: '90%' }}>
            <Routes>
              <Route path='/' element={<Home isLoggedIn={isLoggedIn} displayName={displayName} />}></Route>
              <Route path='/post' element={<Post isLoggedIn={isLoggedIn} displayName={displayName} />}></Route>
              {isLoggedIn ? (
                <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} />}></Route>
              ) : (
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setDisplayName={setDisplayName} />}></Route>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;