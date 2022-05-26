import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { postMessage } from '../services/messages';

function Main() {
  const {user} = useUserContext();
  console.log(user);
const [post, setPost] = useState('')
const handleChange= (e) => {
setPost(e.target.value)};

const handleSubmit = async (e) => {
  e.preventDefault();
  const resp = await postMessage(post, user.id);
  console.log('handlesubmit',resp);
}

  

  return ( 
  <>
  <form onSubmit={handleSubmit}><input type='text' value={post} onChange={handleChange}/>
  <button>Submit</button>
  </form>
  </>
  );
}

export default Main;
