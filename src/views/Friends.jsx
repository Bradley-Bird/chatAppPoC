import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchProfiles } from '../services/profiles';

function Friends() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles().then(setProfiles);
  }, []);

  return (
    <div>
      {profiles?.map(({ id, username }) => (
        <p key={id}>{username}</p>
      ))}
    </div>
  );
}

export default Friends;
