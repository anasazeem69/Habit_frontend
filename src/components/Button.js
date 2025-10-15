import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../config/colors';

const Button = forwardRef(({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props
}, ref) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.small);
        break;
      case 'large':
        baseStyle.push(styles.large);
        break;
      default:
        baseStyle.push(styles.medium);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
      default:
        baseStyle.push(styles.primary);
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    // Size text styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }

    // Variant text styles
    switch (variant) {
      case 'outline':
      case 'ghost':
        baseStyle.push(styles.outlineText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }

    return baseStyle;
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={[...getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon && !loading && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
          />
        ) : (
          <Text style={[...getTextStyle(), textStyle]}>
            {title}
          </Text>
        )}

        {rightIcon && !loading && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },

  // Sizes
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    minHeight: 52,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // States
  disabled: {
    opacity: 0.6,
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
});

Button.displayName = 'Button';

export default Button;