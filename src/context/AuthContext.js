import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authApi from '../api/auth';

// Session configuration
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const SESSION_KEY = 'user_session';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  // Check if session is expired
  const isSessionExpired = (sessionData) => {
    if (!sessionData || !sessionData.timestamp) return true;
    const now = Date.now();
    const sessionAge = now - sessionData.timestamp;
    return sessionAge > SESSION_DURATION;
  };

  // Load user session from storage
  const loadUserSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);

        if (isSessionExpired(parsedSession)) {
          console.log('📱 AuthContext: Session expired, clearing data');
          await AsyncStorage.removeItem(SESSION_KEY);
          setSessionExpiry(null);
          return null;
        }

        console.log('📱 AuthContext: Loaded valid user session:', parsedSession.user.email);
        setSessionExpiry(parsedSession.timestamp + SESSION_DURATION);
        return parsedSession.user;
      }
    } catch (error) {
      console.error('📱 AuthContext: Error loading session:', error);
      await AsyncStorage.removeItem(SESSION_KEY);
      setSessionExpiry(null);
    }
    return null;
  };

  // Save user session to storage
  const saveUserSession = async (userData) => {
    const timestamp = Date.now();
    const sessionData = {
      user: userData,
      timestamp: timestamp,
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    setSessionExpiry(timestamp + SESSION_DURATION);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const userData = await loadUserSession();
      setUser(userData);
      setLoading(false);
    };
    initializeAuth();
  }, []); // Remove user dependency to prevent infinite loop

  // Separate useEffect for session monitoring
  useEffect(() => {
    if (!user) return; // Don't set up interval if no user

    // Set up periodic session check every 5 minutes
    const sessionCheckInterval = setInterval(async () => {
      if (sessionExpiry) {
        const now = Date.now();
        const remaining = sessionExpiry - now;

        // Show warning when less than 24 hours remain
        if (remaining <= 24 * 60 * 60 * 1000 && remaining > 23 * 60 * 60 * 1000) {
          console.log('⚠️ AuthContext: Session expires soon');
          // In a real app, you might want to show an alert or notification here
          // For now, we'll just log it
        }

        // Auto logout when session expires
        if (remaining <= 0) {
          console.log('⏰ AuthContext: Session expired during app usage, auto-logging out');
          setUser(null);
          setSessionExpiry(null);
          await AsyncStorage.removeItem(SESSION_KEY);
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(sessionCheckInterval);
  }, [user, sessionExpiry]); // Only depend on user and sessionExpiry

  const login = async (data) => {
    try {
      const res = await authApi.login(data);
      console.log('🔐 AuthContext: Login successful, setting user:', res.user);

      setUser(res.user);
      await saveUserSession(res.user);

      console.log('✅ AuthContext: User state updated, navigation should trigger');
      return { success: true };
    } catch (err) {
      console.error('❌ AuthContext: Login failed:', err.message);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (data) => {
    try {
      console.log('📝 AuthContext: Starting registration for:', data.email);
      const res = await authApi.register(data);
      console.log('✅ AuthContext: Registration API response:', res);

      // Return success - navigation will be handled by the calling component
      return { success: true, requiresOTP: true, email: data.email };
    } catch (err) {
      console.error('❌ AuthContext: Registration failed:', err.message);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const requestOTP = async (email) => {
    try {
      console.log('📧 AuthContext: Requesting OTP for:', email);
      const res = await authApi.requestOTP(email);
      console.log('✅ AuthContext: OTP request successful');
      return { success: true, message: res.message };
    } catch (err) {
      console.error('❌ AuthContext: OTP request failed:', err.message);
      return { success: false, error: err.message };
    }
  };

  const verifyOTP = async (email, otp, isRegistration = false) => {
    try {
      console.log('🔍 AuthContext: Verifying OTP for:', email, isRegistration ? '(registration)' : '(login)');
      const res = await authApi.verifyOTP(email, otp);
      console.log('✅ AuthContext: OTP verification successful, setting user:', res.user);

      setUser(res.user);
      await saveUserSession(res.user);

      console.log('✅ AuthContext: User state updated after OTP verification');
      return { success: true };
    } catch (err) {
      console.error('❌ AuthContext: OTP verification failed:', err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    console.log('🚪 AuthContext: Logging out user');
    setUser(null);
    setSessionExpiry(null);
    await AsyncStorage.removeItem(SESSION_KEY);
    console.log('✅ AuthContext: User logged out, navigation should trigger');
  };

  const getRemainingSessionTime = () => {
    if (!sessionExpiry) return 0;
    const now = Date.now();
    return Math.max(0, sessionExpiry - now);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      requestOTP,
      verifyOTP,
      getRemainingSessionTime,
      sessionDuration: SESSION_DURATION
    }}>
      {children}
    </AuthContext.Provider>
  );
};