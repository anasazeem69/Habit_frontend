import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../config/colors';
import { forgotPassword } from '../../api/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim()) {
      return 'Email is required';
    } else if (!emailRegex.test(emailValue.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await forgotPassword(email.trim());
      setSuccess(true);
      Alert.alert(
        'Reset Email Sent',
        'If an account with this email exists, you will receive password reset instructions.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (error) setError('');
  };

  if (success) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successMessage}>
            We've sent password reset instructions to {email}
          </Text>
          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.backButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChangeText={handleEmailChange}
          error={error}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />

        <Button
          title="Send Reset Instructions"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />

        <Button
          title="Back to Login"
          onPress={() => navigation.navigate('Login')}
          variant="ghost"
          style={styles.backLink}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
  submitButton: {
    marginTop: 6,
    marginBottom: 12,
  },
  backLink: {
    marginTop: 6,
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  backButton: {
    minWidth: 160,
  },
});

export default ForgotPasswordScreen;
