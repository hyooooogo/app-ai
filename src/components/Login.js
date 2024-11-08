import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./firebaseConfig";

const Login = ({ setIsLoggedIn, setDisplayName }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const displayName = user.displayName;
    try {
      setIsLoggedIn(true);
      setDisplayName(displayName); // displayNameを設定
      console.log("Logged in user name:", displayName);
      navigate('/'); 
    } catch (error) {
      console.error("Error during Google login:", error);
      setDisplayName(displayName);
      navigate('/');
    }
  };

  const containerStyle = {
    height: "90vh",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginBoxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "200px", // 幅を少し短くする
    height: "300px",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
  };

  const inputStyle = {
    width: "90%", // 幅を少し短くする
    padding: "4px", // パディングを小さくする
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "90%", // 幅を少し短くする
    padding: "8px",
    margin: "4px 0",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  };

  const googleButtonStyle = {
    width: "90%",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#db4437",
    color: "white",
    cursor: "pointer",
  };

  const labelStyle = {
    fontSize: "0.9em",
    margin: "5px 0",
    alignSelf: "flex-start",
    paddingLeft: "5%",
  };

  const textStyle = {
    fontSize: "1em",
    margin: "0",
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h2>ログイン</h2>
        <label style={labelStyle}>ユーザー名</label>
        <input type="text" style={inputStyle} />
        <label style={labelStyle}>パスワード</label>
        <input type="password" style={inputStyle} />
        <button style={buttonStyle}>ログイン</button>
        <p style={textStyle}>または</p>
        <button style={googleButtonStyle} onClick={handleGoogleLogin}>
          Googleでログイン
        </button>
      </div>
    </div>
  );
};

export default Login;
