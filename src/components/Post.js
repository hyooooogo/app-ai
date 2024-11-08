import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Post = ({ displayName }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        name: displayName, // displayNameを使用
        createdAt: new Date()
      });
      setContentLength(0);
      setTitle('');
      setContent('');
      navigate('/'); // ホームコンポーネントにリダイレクト
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentLength(e.target.value.length); // 文字数を更新
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.header}>記事を投稿する</h1>
        <label style={styles.label}>タイトル</label>
        <input
          type="text"
          placeholder="タイトル"
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label style={styles.label}>投稿</label>
        <textarea
          placeholder="投稿内容"
          style={styles.textarea}
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <p style={styles.charCount}>文字数: {contentLength}</p>
        <button style={styles.button} onClick={handleSubmit}>投稿する</button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '90vh',
    backgroundColor: '#f0f0f0',
    padding: '0 10px' // 左右に少し余白を追加
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    width: '500px', // 幅を500pxに設定
    height: '400px', // 高さを400pxに設定
    marginTop: '10vh'
  },
  header: {
    alignSelf: 'flex-start', // 左寄せにする
    marginBottom: '10px',
    color: '#333',
    fontSize: '28px',
    marginLeft: '10%'
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: '5px',
    color: '#333',
    fontSize: '14px',
    marginLeft: '10%'
  },
  input: {
    width: '80%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  textarea: {
    width: '80%',
    height: '120px',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  button: {
    width: '80%', // タイトル入力欄と同じ幅にする
    height: '35px',
    backgroundColor: '#008dc2',
    border: 'none',
    color: '#f1f1f1',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  charCount: {
    alignSelf: 'flex-start',
    marginBottom: '10px',
    color: '#333',
    fontSize: '14px',
    marginLeft: '10%',
    marginTop: '0px'
  },
};

styles.button[':hover'] = {
  backgroundColor: '#005f8a'
};

export default Post;