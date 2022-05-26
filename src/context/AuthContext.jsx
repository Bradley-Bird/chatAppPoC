import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('sign-in');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        type,
        setType,
        error,
        setError,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const data = useContext(AuthContext);
  if (data === undefined) {
    throw new Error('Auth ContextProvider not wrapped!');
  }
  return data;
};

export { AuthProvider, useAuthContext };
