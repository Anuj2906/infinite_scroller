import React, { useState, useEffect, useCallback } from 'react';
import './userposts.css';

const UserPosts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
   }, [handleScroll]);

  return (
    <div className="user-posts">
      {data.map((post) => (
        <div key={post.id} className="user-post">
          <h2>{post.title}</h2>
          <p><strong>User ID:</strong> {post.userId}</p>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default UserPosts;
