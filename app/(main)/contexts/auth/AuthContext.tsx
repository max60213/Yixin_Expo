'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
     loadUser();
     }, []);

   const loadUser = async () => {
     try {
       const userData = await SecureStore.getItemAsync('user');
       if (userData) {
         const parsedUser = JSON.parse(userData);
         setUser(parsedUser);
         setIsAuthenticated(true);
         }
       } catch (error) {
        console.error('Failed to load user:', error);
         }
       };

    const login = async (email: string, password: string) => {
      try {
        const response = await fetch('https://studio.yixin.art/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          await SecureStore.setItemAsync('user', JSON.stringify(data.user));
          setIsAuthenticated(true);
            } else {
             throw new Error('Invalid credentials');
              }
            } catch (error) {
          console.error('Login error:', error);
            }
          };

      const signup = async (email: string, password: string, name: string) => {
         try {
           const response = await fetch('https://studio.yixin.art/api/signup', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password, name }),
              });
             if (response.ok) {
               const data = await response.json();
               setUser(data.user);
               await SecureStore.setItemAsync('user', JSON.stringify(data.user));
               setIsAuthenticated(true);
                 } else {
                   throw new Error('Signup failed');
                     }
                   } catch (error) {
                 console.error('Signup error:', error);
                   }
                 };

            const logout = async () => {
             try {
               await SecureStore.deleteItemAsync('user');
               setUser(null);
               setIsAuthenticated(false);
                 } catch (error) {
               console.error('Logout error:', error);
                 }
               };

    return (
       <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
          {children}
         </AuthContext.Provider>
      );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
     }
     return context;
}

export default AuthContext;
