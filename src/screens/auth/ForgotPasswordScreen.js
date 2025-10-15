import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Forgot Password</Text>
    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
    <Button title="Reset Password" onPress={() => {}} />
    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
      <Text style={styles.link}>Back to Login</Text>
    </TouchableOpacity>
  </View>
);

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
});

export default ForgotPasswordScreen;
