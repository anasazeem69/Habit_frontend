import React, { useState, forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../config/colors';

const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  showPasswordToggle = false,
  leftIcon,
  rightIcon,
  containerStyle,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border.light;
  };

  const getBackgroundColor = () => {
    if (!editable) return colors.gray[100];
    return colors.white;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}

      <View style={[
        styles.inputContainer,
        {
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
        },
        style
      ]}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          ref={ref}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            inputStyle
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          {...props}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.passwordToggle}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !showPasswordToggle && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}

        {maxLength && (
          <Text style={styles.charCount}>
            {value?.length || 0}/{maxLength}
          </Text>
        )}
      </View>

      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  passwordToggle: {
    fontSize: 18,
  },
  charCount: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 8,
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 4,
    fontWeight: '500',
  },
});

Input.displayName = 'Input';

export default Input;