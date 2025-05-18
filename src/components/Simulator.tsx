import React from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions, SafeAreaView } from 'react-native';
import { SimulationHeader } from './SimulationHeader';
import { SimulationControls } from './SimulationControls';
import { ProcessTable } from './ProcessTable';
import { MonitoringArea } from './MonitoringArea';
import { useSimulation } from '../contexts/SimulationContext';

export function Simulator() {
  const { state } = useSimulation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.content, isTablet && styles.tabletContent]}>
          <SimulationHeader />
          <SimulationControls />
          <View style={[styles.monitoringContainer, isTablet && styles.tabletMonitoring]}>
            <MonitoringArea />
          </View>
          <ProcessTable />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  tabletContent: {
    padding: 24,
  },
  monitoringContainer: {
    marginVertical: 20,
  },
  tabletMonitoring: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
});