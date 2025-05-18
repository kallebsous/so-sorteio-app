import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const buttonVariants = {
  variant: {
    default: {
      backgroundColor: '#6200EE', // Cor primária (ajuste conforme seu tema)
      color: '#FFFFFF', // Texto branco
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Sombra para Android
    },
    destructive: {
      backgroundColor: '#EF4444', // Vermelho para ações destrutivas
      color: '#FFFFFF',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#D1D5DB', // Cor da borda (ajuste conforme tema)
      color: '#374151', // Texto cinza escuro
    },
    secondary: {
      backgroundColor: '#6B7280', // Cinza para secundário
      color: '#FFFFFF',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#374151',
    },
    link: {
      backgroundColor: 'transparent',
      color: '#6200EE',
      textDecorationLine: 'underline',
    },
  },
  size: {
    default: {
      height: 36, // Equivalente a h-9 (9 * 4px)
      paddingHorizontal: 16, // px-4
      paddingVertical: 8, // py-2
      fontSize: 14, // text-sm
    },
    sm: {
      height: 32, // h-8
      paddingHorizontal: 12, // px-3
      fontSize: 12, // text-xs
    },
    lg: {
      height: 40, // h-10
      paddingHorizontal: 32, // px-8
      fontSize: 16,
    },
    icon: {
      height: 36, // h-9
      width: 36, // w-9
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
  },
};

interface ButtonProps {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  onPress?: () => void;
  children: React.ReactNode;
  style?: any; // Para estilos adicionais
  disabled?: boolean;
}

const Button = React.forwardRef<any, ButtonProps>(
  ({ variant = 'default', size = 'default', onPress, children, style, disabled, ...props }, ref) => {
    const variantStyles = buttonVariants.variant[variant] || buttonVariants.variant.default;
    const sizeStyles = buttonVariants.size[size] || buttonVariants.size.default;

    return (
      <TouchableOpacity
        style={[
          styles.base,
          variantStyles,
          sizeStyles,
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Text
          style={[
            styles.text,
            { color: variantStyles.color, fontSize: sizeStyles.fontSize },
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6, // rounded-md
    flexDirection: 'row',
  },
  text: {
    fontWeight: '500', // font-medium
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Button, buttonVariants };