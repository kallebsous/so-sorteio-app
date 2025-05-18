import { SimulationState, SimulationMetrics } from '@/types';

export function calculateMetrics(state: SimulationState): SimulationMetrics {
  const { processes, currentTime } = state;
  
  // Calculate throughput: number of completed processes per unit time
  const completedProcesses = processes.filter(p => p.state === 'FINISHED');
  const throughput = currentTime > 0 ? completedProcesses.length / currentTime : 0;
  
  // Calculate average response time: average time from arrival to first execution
  const responseTimes = processes
    .filter(p => p.startTime !== undefined)
    .map(p => (p.startTime as number) - p.arrivalTime);
    
  const averageResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
    : 0;
  
  // Calculate CPU utilization: percentage of time CPU was used
  const totalBurstTime = processes.reduce((sum, p) => {
    const executedTime = p.burstTime - p.remainingTime;
    return sum + executedTime;
  }, 0);
  
  const cpuUtilization = currentTime > 0 ? (totalBurstTime / currentTime) * 100 : 0;
  
  // Calculate fairness index (Jain's fairness index)
  // This measures how fairly resources (CPU time) were allocated
  const allocations = processes.map(p => p.burstTime - p.remainingTime);
  const fairnessIndex = calculateJainsFairnessIndex(allocations);
  
  // Calculate average wait time
  const averageWaitTime = processes.length > 0
    ? processes.reduce((sum, p) => sum + p.totalWaitTime, 0) / processes.length
    : 0;
    
  return {
    throughput,
    averageResponseTime,
    cpuUtilization: Math.min(cpuUtilization, 100), // Cap at 100%
    fairnessIndex,
    averageWaitTime,
  };
}

// Jain's fairness index calculation
// Returns a value between 0 and 1, where 1 means completely fair
function calculateJainsFairnessIndex(allocations: number[]): number {
  if (allocations.length === 0) return 1; // Perfect fairness if no processes
  
  const sum = allocations.reduce((acc, val) => acc + val, 0);
  const sumSquared = Math.pow(sum, 2);
  
  const sumOfSquares = allocations.reduce((acc, val) => acc + Math.pow(val, 2), 0);
  const n = allocations.length;
  
  if (sumOfSquares === 0) return 1; // Avoid division by zero
  
  return sumSquared / (n * sumOfSquares);
}