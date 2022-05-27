import { render } from '@testing-library/react';
import { UserProvider } from './context/UserContext';
import Main from './views/Main';

describe('example test', () => {
  it('first test', async () => {
    render (<UserProvider> <Main/>
    </UserProvider>);
  });
});