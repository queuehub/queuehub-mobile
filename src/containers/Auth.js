import React, { useMemo, useEffect, useState, createContext, useContext } from 'react';
import { Alert } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import Loading from 'Screens/Loading';

const AuthContext = createContext(null);

export default function AuthContainer(props) {
  const { children } = props;

  const [state, setState] = useState({ isLoggedIn: false, isLoading: true });

  useEffect(() => {
    async function initSession() {
      const isInitialized = Spotify.initialize({
        clientID: '0a31a2abfc5945bb9e3b3507e6f8361c',
        sessionUserDefaultsKey: 'SpotifySession',
        redirectURL: 'jamstack://auth',
        scopes: ['streaming'],
        tokenSwapURL: 'http://localhost:4000/v1/spotify/tokens/swap',
        tokenRefreshURL: 'http://localhost:4000/v1/spotify/tokens/refresh',
      });

      if (isInitialized) {
        setState({ isLoggedIn: true, isLoading: false });
      } else {
        setState(s => ({ ...s, isLoading: false }));
      }
    }

    initSession();
  }, []);

  const contextState = useMemo(
    () => ({
      async login() {
        const loggedIn = await Spotify.login();
        if (loggedIn) {
          setState(s => ({ ...s, isLoggedIn: true }));
        } else {
          Alert.alert('You have to login');
        }
      },
      async logout() {
        await Spotify.logout();
        setState(s => ({ ...s, isLoggedIn: false }));
      },
      isLoggedIn: state.isLoggedIn,
    }),
    [state.isLoggedIn],
  );

  return (
    <AuthContext.Provider value={contextState}>
      {state.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}