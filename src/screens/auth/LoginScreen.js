
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    const res = await login(form);
    if (!res.success) setError(res.error);
    else navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 12 }} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.linkContainer}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  linkContainer: {
    marginTop: 12,
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
