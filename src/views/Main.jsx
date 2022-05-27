import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import {
  fetchMessages,
  postMessage,
  subscribe,
  unsubscribe,
} from '../services/messages';

function Main() {
  const [messages, setMessages] = useState([]);
  const { user } = useUserContext();
  const [post, setPost] = useState('');
  const handleChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postMessage(post, user.id);
    setPost('');
  };

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    fetchMessages().then(setMessages);

    subscribe(handleMessageReceived);

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        {messages.map(({ id, posts }) => (
          <p key={id}>{posts}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={post} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Main;
