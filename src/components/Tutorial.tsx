import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from './ui/button';

const tutorialSteps = [
  {
    title: 'O que é Escalonamento por Loteria?',
    content: 'O escalonamento por loteria é um algoritmo de escalonamento probabilístico onde processos recebem tickets (bilhetes) e um sorteio determina qual processo será executado. Quanto mais tickets um processo possui, maior sua chance de ser escolhido.',
    icon: '🎫'
  },
  {
    title: 'Como funciona?',
    content: 'A cada quantum de tempo, um ticket é sorteado aleatoriamente. O processo que possui esse ticket é selecionado para execução. Após o quantum, um novo sorteio acontece.',
    icon: '🎲'
  },
  {
    title: 'Vantagens',
    content: '- Simplicidade de implementação\n- Justiça probabilística\n- Priorização flexível através da quantidade de tickets\n- Bom para cargas de trabalho mistas',
    icon: '✨'
  },
  {
    title: 'Usando o Simulador',
    content: '1. Adicione processos com diferentes tempos e tickets\n2. Observe o sorteio acontecendo\n3. Acompanhe as métricas de desempenho\n4. Experimente diferentes configurações',
    icon: '🎮'
  },
];

export function Tutorial() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Aprenda Escalonamento por Loteria</Text>
        <Text style={styles.subtitle}>
          Um guia interativo para entender como funciona o escalonamento de processos
        </Text>
        
        <View style={[styles.stepsContainer, isTablet && styles.tabletGrid]}>
          {tutorialSteps.map((step, index) => (
            <View 
              key={index} 
              style={[
                styles.stepContainer,
                isTablet && styles.tabletStep,
                Platform.select({
                  ios: styles.iosShadow,
                  android: styles.androidShadow,
                  web: styles.webShadow,
                })
              ]}
            >
              <Text style={styles.stepIcon}>{step.icon}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepContent}>{step.content}</Text>
            </View>
          ))}
        </View>
        
        <Button 
          onPress={() => navigation.navigate('Simulator')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar Simulação</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  stepsContainer: {
    gap: 20,
  },
  tabletGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stepContainer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
  },
  tabletStep: {
    width: '45%',
    marginHorizontal: '2.5%',
  },
  stepIcon: {
    fontSize: 36,
    marginBottom: 16,
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  stepContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a4a4a',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  androidShadow: {
    elevation: 4,
  },
  webShadow: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
});