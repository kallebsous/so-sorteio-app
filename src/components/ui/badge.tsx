import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const badgeVariants = {
  variant: {
    default: {
      backgroundColor: '#6200EE', // Cor primária (ajuste ao seu tema)
      color: '#FFFFFF', // Texto branco
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: '#6B7280', // Cinza para secundário
      color: '#FFFFFF',
      borderColor: 'transparent',
    },
    destructive: {
      backgroundColor: '#EF4444', // Vermelho para destrutivo
      color: '#FFFFFF',
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#374151', // Texto cinza escuro
      borderColor: '#D1D5DB', // Borda cinza
      borderWidth: 1,
    },
  },
};

interface BadgeProps {
  variant?: keyof typeof badgeVariants.variant;
  children: React.ReactNode;
  style?: any; // Para estilos adicionais
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, style }) => {
  const variantStyles = badgeVariants.variant[variant] || badgeVariants.variant.default;

  return (
    <View style={[styles.badge, variantStyles, style]}>
      <Text style={[styles.text, { color: variantStyles.color }]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6, // Equivalente a rounded-md
    paddingHorizontal: 10, // px-2.5
    paddingVertical: 2, // py-0.5
    borderWidth: 0, // Será sobrescrito por variantes, se necessário
  },
  text: {
    fontSize: 12, // text-xs
    fontWeight: '600', // font-semibold
    textAlign: 'center',
  },
});

export { Badge, badgeVariants };