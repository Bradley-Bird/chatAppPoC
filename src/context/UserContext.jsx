import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/auth';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const user = getUser();
  const [currentUser, setCurrentUser] = useState(user || { email: null });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const data = useContext(UserContext);
  if (data === undefined) {
    throw new Error('somethings up with the context.');
  }
  return data;
};

export { UserProvider, useUserContext };
