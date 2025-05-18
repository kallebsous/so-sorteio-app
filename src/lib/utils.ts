import { StyleSheet } from 'react-native';

export function cn(...inputs: any[]) {
  return StyleSheet.flatten(inputs);
}