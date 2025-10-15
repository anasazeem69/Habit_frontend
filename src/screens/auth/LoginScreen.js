
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../config/colors';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: '' });
    }
  };

  const handleBlur = (key) => {
    setTouched({ ...touched, [key]: true });
    validateField(key);
  };

  const validateField = (key) => {
    const value = form[key];
    let error = '';

    switch (key) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        }
        break;

      default:
        break;
    }

    setErrors({ ...errors, [key]: error });
    return !error;
  };

  const validateForm = () => {
    const fields = ['email', 'password'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const result = await login(form);

      if (result.success) {
        // Navigation will be handled automatically by AppNavigator when user state changes
        console.log('✅ Login successful, navigation will happen automatically');
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid email or password.');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue tracking your habits</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="Enter your email address"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : ''}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            secureTextEntry
            showPasswordToggle
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <Button
            title="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            variant="ghost"
            size="small"
            style={styles.forgotPasswordLink}
          />

          <Button
            title="Don't have an account? Create one"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            style={styles.registerLink}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: 6,
    marginBottom: 12,
  },
  forgotPasswordLink: {
    marginBottom: 12,
  },
  registerLink: {
    marginTop: 6,
  },
});

export default LoginScreen;
