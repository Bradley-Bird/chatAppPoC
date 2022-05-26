import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchMessages } from '../services/messages';

function MessageList() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const grabAllPosts = async () => {
      const data = await fetchMessages();
      setAllPosts(data);
    };
    grabAllPosts();
  }, []);
  return <div>MessageList</div>;
}

export default MessageList;
