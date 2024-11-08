import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // 時間が新しい順に並べ替え
      postsData.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setPosts(postsData);
    };

    const fetchCurrentUser = () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user.displayName);
      }
    };

    fetchPosts();
    fetchCurrentUser();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} style={styles.post}>
              <h2 style={styles.postTitle}>{post.title}</h2>
              <p style={styles.postContent}>{post.content}</p>
              <div style={styles.postFooter}>
                <p style={styles.postAuthor}>@{post.name}</p>
                <p style={styles.postDate}>{post.createdAt.toDate().toLocaleString()}</p>
                {currentUser === post.name && (
                  <button style={styles.deleteButton} onClick={() => handleDelete(post.id)}>削除</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>投稿がありません</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    width: '800px',
    height: '90vh', // 高さを100vhに設定
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    overflowY: 'scroll' // 縦方向のスクロールを有効にする
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  post: {
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '220px',
    overflow: 'hidden',
    boxShadow: '5px 9px 15px -5px #777777',
    margin: '20px 20px 0px 0px'
   
  },
  postTitle: {
    fontSize: '24px',
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' // タイトルがはみ出さないようにする
  },
  postContent: {
    fontSize: '16px',
    marginBottom: '10px',
    flex: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis' // コンテンツがはみ出さないようにする
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  postAuthor: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' // 投稿者名がはみ出さないようにする
  },
  postDate: {
    fontSize: '12px',
    color: '#999',
    marginLeft: '10px'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  noPosts: {
    gridColumn: 'span 2',
    fontSize: '18px',
    color: '#555'
  }
};

export default Home;