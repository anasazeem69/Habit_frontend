
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register, loading } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    professional: '',
  });
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    setError('');
    console.log('Register form data:', form);
    if (!form.fullName || !form.phone || !form.email || !form.password || !form.confirmPassword || !form.professional) {
      setError('All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const { confirmPassword, ...registerData } = form;
    try {
      const res = await register(registerData);
      console.log('Register API response:', res);
      if (!res.success) setError(res.error);
      else navigation.replace('Main');
    } catch (err) {
      console.log('Register API error:', err);
      setError('Registration failed. See console for details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={form.fullName} onChangeText={v => handleChange('fullName', v)} />
      <TextInput style={styles.input} placeholder="Phone" value={form.phone} onChangeText={v => handleChange('phone', v)} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={v => handleChange('email', v)} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Professional Field" value={form.professional} onChangeText={v => handleChange('professional', v)} />
      <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={form.confirmPassword} onChangeText={v => handleChange('confirmPassword', v)} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 12 }} />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterScreen;
