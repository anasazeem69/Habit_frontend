import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.login(data);
      setUser(res.user);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.register(data);
      setUser(res.user);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
