import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { logout } from '../services/auth';
import {
  fetchMessages,
  postMessage,
  subscribe,
  unsubscribe,
} from '../services/messages';
import Friends from './Friends';

function Main() {
  const history = useHistory();
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

  const handleLogOut = () => {
    logout();
    history.push('/auth');
  };

  useEffect(() => {
    fetchMessages().then(setMessages);

    subscribe(handleMessageReceived);

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button onClick={handleLogOut}>LogOut</button>
      <div>
        {messages.map(({ id, posts }) => (
          <p key={id}>{posts}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={post} onChange={handleChange} />
        <button>Submit</button>
      </form>
      <Friends />
    </div>
  );
}

export default Main;
