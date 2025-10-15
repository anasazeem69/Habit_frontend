import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../config/colors';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { requestOTP, verifyOTP } = useContext(AuthContext);

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);

  console.log('🎯 OTPScreen: Component rendered');
  console.log('🎯 OTPScreen: Route params:', route.params);

  useEffect(() => {
    // Get email and registration status from route params
    if (route.params?.email) {
      setEmail(route.params.email);
    }
    if (route.params?.isRegistration) {
      setIsRegistration(route.params.isRegistration);
    }

    // Start countdown for resend (60 seconds)
    setCountdown(60);
  }, [route.params]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(email, otp, isRegistration);
      if (result.success) {
        const successMessage = isRegistration
          ? 'Email verified successfully! Registration complete.'
          : 'OTP verified successfully!';
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
            onPress: () => {
              // Navigation will be handled by AuthContext and AppNavigator
            }
          }
        ]);
      } else {
        Alert.alert('Error', result.error || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    try {
      const result = await requestOTP(email);
      if (result.success) {
        Alert.alert('Success', 'OTP sent successfully');
        setCountdown(60); // Reset countdown
      } else {
        Alert.alert('Error', result.error || 'Failed to resend OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isRegistration ? 'Verify Your Email' : 'Verify Your Identity'}
          </Text>
          <Text style={styles.subtitle}>
            {isRegistration
              ? 'Complete your registration by verifying your email'
              : 'Enter the 6-digit code sent to your email'
            }{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            placeholder="000000"
            keyboardType="numeric"
            maxLength={6}
            autoFocus={true}
            style={styles.otpInput}
            textAlign="center"
            fontSize={24}
            letterSpacing={8}
          />

          <Button
            title={isRegistration ? "Verify & Complete Registration" : "Verify & Login"}
            onPress={handleVerifyOTP}
            loading={loading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code?</Text>
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={countdown > 0 || resendLoading}
              style={styles.resendButton}
            >
              <Text style={[
                styles.resendButtonText,
                (countdown > 0 || resendLoading) && styles.resendButtonDisabled
              ]}>
                {resendLoading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleBackToLogin}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              {isRegistration ? "Back to Register" : "Back to Login"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            • OTP expires in 10 minutes{'\n'}
            • You can request a new OTP after 1 minute{'\n'}
            • Check your spam/junk folder if you don't see the email{'\n'}
            {isRegistration && '• Complete verification to finish your registration'}
          </Text>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailText: {
    color: colors.primary,
    fontWeight: '600',
  },
  form: {
    marginBottom: 40,
  },
  otpInput: {
    marginBottom: 24,
    textAlign: 'center',
  },
  verifyButton: {
    marginBottom: 24,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  resendButtonDisabled: {
    color: colors.text.muted,
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});

export default OTPScreen;