import React from 'react';

const Nav = ({ isLoggedIn }) => {
  const navStyle = {
    height: '100%',
    backgroundColor: '#32373b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#919497',
    textAlign: 'center',
    width: '380px',
  };

  const linkStyle = {
    margin: '10px 0',
    textDecoration: 'none',
    color: '#919497'
  };

  const textStyle = {
    fontSize: '1.5em', 
    margin: '0'
  };

  const linkHoverStyle = {
    color: 'white'
  };

  return (
    <nav style={navStyle}>
      <a href="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#919497'}><h2 style={textStyle}>ホーム</h2></a>
      <a style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#919497'}><h2 style={textStyle}>プロフィール</h2></a>
      <a href="/post" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#919497'}><h2 style={textStyle}>投稿する</h2></a>
      {isLoggedIn ? (
          <a href="/logout" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#919497'}><h2 style={textStyle}>ログアウト</h2></a>
        ) : (
          <a href="/login" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = '#919497'}><h2 style={textStyle}>ログイン</h2></a>
        )}     
      <div style={{ marginTop: '30px' }}><h2 style={textStyle}>もっと見る</h2></div>
    </nav>
  );
}

export default Nav;