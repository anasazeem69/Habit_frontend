import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../config/colors';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

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
    let error = '';

    switch (key) {
      case 'email':
        if (!form.email.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!form.password) {
          error = 'Password is required';
        } else if (form.password.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [key]: error });
    return !error;
  };

  const validateForm = () => {
    const emailValid = validateField('email');
    const passwordValid = validateField('password');
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    return emailValid && passwordValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await login(form);

      if (result.success) {
        // Navigation will be handled automatically by AppNavigator when user state changes
        console.log('✅ Login successful, navigation will happen automatically');
      } else {
        // Show specific error message based on the error
        const errorMessage = result.error || 'Login failed. Please try again.';
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back! 👋</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
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

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  signupLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;