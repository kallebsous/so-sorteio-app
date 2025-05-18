import { z } from 'zod';

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  tickets: number[];
  state: 'READY' | 'RUNNING' | 'FINISHED';
  startTime?: number;
  endTime?: number;
  totalWaitTime: number;
}

export const ProcessSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  arrivalTime: z.number().min(0),
  burstTime: z.number().min(1),
  tickets: z.array(z.number()).min(1),
  state: z.enum(['READY', 'RUNNING', 'FINISHED'])
});

export interface SimulationState {
  currentTime: number;
  quantum: number;
  processes: Process[];
  runningProcess: Process | null;
  isRunning: boolean;
  speed: number;
  drawnTicket: number | null;
  ticketPool: number[];
  history: {
    time: number;
    processId: string | null;
    processName: string | null;
    ticket: number | null;
  }[];
  processCount: number;
}

export interface SimulationMetrics {
  throughput: number;
  averageResponseTime: number;
  cpuUtilization: number;
  fairnessIndex: number;
  averageWaitTime: number;
}