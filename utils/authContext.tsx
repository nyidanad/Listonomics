import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { supabase } from './supabase';

import ToastMessage, { Toast, ToastType } from '../components/toastMessage/toastMessage';

type User = {
  email: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logOut: () => void;
}

const authStorageKey = 'auth-key';

export const AuthContext = createContext<AuthState>({
  user: null,
  isLoggedIn: false,
  isReady: false,
  logIn: async () => {},
  signUp: async () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<Toast>();

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  }

  const storageAuthState = async (newState: { isLoggedIn: boolean; user?: User | null }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log("Error saving", error)
    }
  };

  const logIn = async (email: string, password: string) => {
    // basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || password.length < 6) {
      showToast('Please provide a valid email and password.', 'warning');
      throw new Error('Please provide a valid email and password.');
    }

    // authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        showToast('Invalid email or password.', 'error');
        throw error || new Error('Login failed');
      }
      const userObj: User = { email: data.user.email || '' };
      setUser(userObj);
      setIsLoggedIn(true);
      await storageAuthState({ isLoggedIn: true, user: userObj });
      router.replace('/');
    } catch (err) {
      showToast('Login failed. Please try again.', 'error');
      throw err;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    // basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailRegex.test(email) || password.length < 6) {
      showToast('Please provide valid name, email, and password (min 8 characters).', 'warning');
      throw new Error('Please provide valid details.');
    }

    // registration
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name: name,
          }
        }
      });

      if (!data.user) {
        showToast('Sign up failed. Please try again.', 'error');
        throw new Error('User creation failed');
      }

      const userObj: User = { email: data.user.email || '' };
      setUser(userObj);
      await storageAuthState({ isLoggedIn: false, user: userObj });
      showToast('Account created! Please verify your email.', 'success');
    } catch (err) {
      console.log('Sign up error:', err);
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    storageAuthState({ isLoggedIn: false, user: null });
    router.replace('/login');
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);

        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
          setUser(auth.user || null);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isReady, logIn, signUp, logOut }}>
      {children}
      {toast && <ToastMessage message={toast.message} type={toast.type} onHide={() => setToast(undefined)} />}
    </AuthContext.Provider>
  )
}