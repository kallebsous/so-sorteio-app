import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const toggleVariants = {
  variant: {
    default: {
      backgroundColor: 'transparent',
      color: '#374151',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      color: '#374151',
    },
  },
  size: {
    default: {
      height: 36, // h-9
      paddingHorizontal: 12, // px-3
      fontSize: 14, // text-sm
    },
    sm: {
      height: 32, // h-8
      paddingHorizontal: 8, // px-2
      fontSize: 12,
    },
    lg: {
      height: 40, // h-10
      paddingHorizontal: 12, // px-3
      fontSize: 16,
    },
  },
};

interface ToggleProps {
  variant?: keyof typeof toggleVariants.variant;
  size?: keyof typeof toggleVariants.size;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
  style?: any;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  variant = 'default',
  size = 'default',
  pressed = false,
  onPressedChange,
  children,
  style,
  disabled,
}) => {
  const variantStyles = toggleVariants.variant[variant] || toggleVariants.variant.default;
  const sizeStyles = toggleVariants.size[size] || toggleVariants.size.default;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyles,
        sizeStyles,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={() => onPressedChange?.(!pressed)}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: variantStyles.color, fontSize: sizeStyles.fontSize }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6, // rounded-md
  },
  text: {
    fontWeight: '500', // font-medium
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: '#2DD4BF', // Cor de destaque para estado "on" (ajuste ao tema)
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Toggle, toggleVariants };