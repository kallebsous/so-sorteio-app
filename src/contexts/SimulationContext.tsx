import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Process, SimulationState, SimulationMetrics } from '@/types';
import { calculateMetrics } from '@/lib/metrics';

const generateProcessId = (index: number) => {
  return `P${String(index + 1).padStart(3, '0')}`;
};

const generateExampleProcesses = () => {
  const examples = [
    { arrivalTime: 0, burstTime: 4, tickets: [1, 2], name: 'Editor de Texto' },
    { arrivalTime: 0, burstTime: 6, tickets: [3, 4, 5], name: 'Navegador Web' },
    { arrivalTime: 2, burstTime: 8, tickets: [6, 7, 8, 9], name: 'Compilador' },
    { arrivalTime: 2, burstTime: 3, tickets: [10, 11], name: 'Terminal' },
    { arrivalTime: 4, burstTime: 5, tickets: [12, 13, 14], name: 'Player de Música' },
    { arrivalTime: 4, burstTime: 7, tickets: [15, 16, 17, 18], name: 'IDE' },
    { arrivalTime: 6, burstTime: 4, tickets: [19, 20], name: 'Chat' },
    { arrivalTime: 6, burstTime: 6, tickets: [21, 22, 23], name: 'Gerenciador de Arquivos' },
    { arrivalTime: 8, burstTime: 5, tickets: [24, 25, 26], name: 'Cliente de Email' },
    { arrivalTime: 8, burstTime: 3, tickets: [27, 28], name: 'Calculadora' },
  ];

  return examples.map((example, index) => ({
    ...example,
    id: generateProcessId(index),
    remainingTime: example.burstTime,
    state: 'READY' as const,
    totalWaitTime: 0,
  }));
};

// Define action types
type SimulationAction =
  | { type: 'START_SIMULATION' }
  | { type: 'PAUSE_SIMULATION' }
  | { type: 'RESET_SIMULATION' }
  | { type: 'STEP_SIMULATION' }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'ADD_PROCESS'; payload: Omit<Process, 'id' | 'remainingTime' | 'state' | 'totalWaitTime'> }
  | { type: 'REMOVE_PROCESS'; payload: string }
  | { type: 'UPDATE_PROCESS'; payload: Process }
  | { type: 'DRAW_TICKET' }
  | { type: 'TICK' };

// Context interface
interface SimulationContextType {
  state: SimulationState;
  metrics: SimulationMetrics;
  dispatch: React.Dispatch<SimulationAction>;
  addProcess: (process: Omit<Process, 'id' | 'remainingTime' | 'state' | 'totalWaitTime'>) => void;
  removeProcess: (id: string) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  stepSimulation: () => void;
  setSpeed: (speed: number) => void;
  loadExampleProcesses: () => void;
}

// Initial state
const initialState: SimulationState = {
  currentTime: 0,
  quantum: 4,
  processes: [],
  runningProcess: null,
  isRunning: false,
  speed: 1000,
  drawnTicket: null,
  ticketPool: [],
  history: [],
  processCount: 0,
};

// Create context
const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

// Reducer function
function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case 'START_SIMULATION':
      return {
        ...state,
        isRunning: true,
      };
    
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        isRunning: false,
      };
    
    case 'RESET_SIMULATION':
      return {
        ...initialState,
        processCount: state.processCount,
        processes: state.processes.map(process => ({
          ...process,
          remainingTime: process.burstTime,
          state: 'READY' as const,
          startTime: undefined,
          endTime: undefined,
          totalWaitTime: 0,
        })),
      };
    
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.payload,
      };
    
    case 'ADD_PROCESS': {
      const { arrivalTime, burstTime, tickets, name } = action.payload;
      const newProcess: Process = {
        id: generateProcessId(state.processCount),
        name,
        arrivalTime,
        burstTime,
        remainingTime: burstTime,
        tickets,
        state: 'READY',
        totalWaitTime: 0,
      };
      
      return {
        ...state,
        processes: [...state.processes, newProcess],
        ticketPool: [...state.ticketPool, ...tickets],
        processCount: state.processCount + 1,
      };
    }
    
    case 'REMOVE_PROCESS': {
      const processToRemove = state.processes.find(p => p.id === action.payload);
      if (!processToRemove) return state;
      
      return {
        ...state,
        processes: state.processes.filter(p => p.id !== action.payload),
        ticketPool: state.ticketPool.filter(t => !processToRemove.tickets.includes(t)),
        runningProcess: state.runningProcess?.id === action.payload ? null : state.runningProcess,
      };
    }
    
    case 'UPDATE_PROCESS':
      return {
        ...state,
        processes: state.processes.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
      };
    
    case 'DRAW_TICKET': {
      const readyProcesses = state.processes.filter(p => 
        p.state === 'READY' && p.arrivalTime <= state.currentTime
      );
      
      if (readyProcesses.length === 0) {
        return state;
      }
      
      const availableTickets = readyProcesses.flatMap(p => p.tickets);
      
      if (availableTickets.length === 0) {
        return state;
      }
      
      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      const drawnTicket = availableTickets[randomIndex];
      
      const selectedProcess = readyProcesses.find(p => 
        p.tickets.includes(drawnTicket)
      );
      
      if (!selectedProcess) {
        return state;
      }
      
      const updatedProcesses = state.processes.map(p => {
        if (p.id === selectedProcess.id) {
          return {
            ...p,
            state: 'RUNNING' as const,
            startTime: p.startTime === undefined ? state.currentTime : p.startTime,
          };
        }
        if (p.state === 'RUNNING') {
          return {
            ...p,
            state: 'READY' as const,
          };
        }
        return p;
      });
      
      return {
        ...state,
        processes: updatedProcesses,
        runningProcess: selectedProcess,
        drawnTicket,
        history: [
          ...state.history,
          { 
            time: state.currentTime, 
            processId: selectedProcess.id,
            processName: selectedProcess.name,
            ticket: drawnTicket 
          }
        ].slice(-5),
      };
    }
    
    case 'TICK': {
      if (!state.runningProcess) {
        return simulationReducer(state, { type: 'DRAW_TICKET' });
      }
      
      let updatedCurrentTime = state.currentTime + 1;
      let remainingQuantum = state.quantum;
      
      const updatedProcesses = state.processes.map(p => {
        if (p.id !== state.runningProcess?.id) {
          if (p.state === 'READY' && p.arrivalTime <= state.currentTime) {
            return {
              ...p,
              totalWaitTime: p.totalWaitTime + 1,
            };
          }
          return p;
        }
        
        const newRemainingTime = p.remainingTime - 1;
        
        if (newRemainingTime <= 0) {
          return {
            ...p,
            remainingTime: 0,
            state: 'FINISHED' as const,
            endTime: updatedCurrentTime,
          };
        }
        
        return {
          ...p,
          remainingTime: newRemainingTime,
        };
      });
      
      const updatedRunningProcess = updatedProcesses.find(p => p.id === state.runningProcess?.id);
      
      const shouldDrawNewTicket = 
        !updatedRunningProcess || 
        updatedRunningProcess.state === 'FINISHED' || 
        (state.currentTime % state.quantum) === 0;
      
      const nextState = {
        ...state,
        currentTime: updatedCurrentTime,
        processes: updatedProcesses,
        runningProcess: updatedRunningProcess?.state === 'FINISHED' ? null : updatedRunningProcess,
      };
      
      if (shouldDrawNewTicket) {
        return simulationReducer(nextState, { type: 'DRAW_TICKET' });
      }
      
      return nextState;
    }
    
    default:
      return state;
  }
}

// Provider component
export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const [metrics, setMetrics] = React.useState<SimulationMetrics>({
    throughput: 0,
    averageResponseTime: 0,
    cpuUtilization: 0,
    fairnessIndex: 0,
    averageWaitTime: 0,
  });
  
  useEffect(() => {
    const savedState = localStorage.getItem('simulationState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'RESET_SIMULATION' });
        parsedState.processes.forEach((process: Omit<Process, 'id' | 'remainingTime' | 'state' | 'totalWaitTime'>) => {
          dispatch({ type: 'ADD_PROCESS', payload: process });
        });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    const stateToSave = {
      processes: state.processes.map(({ arrivalTime, burstTime, tickets, name }) => ({
        arrivalTime,
        burstTime,
        tickets,
        name,
      })),
    };
    localStorage.setItem('simulationState', JSON.stringify(stateToSave));
  }, [state.processes]);
  
  useEffect(() => {
    let intervalId: number;
    
    if (state.isRunning) {
      intervalId = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, state.speed);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [state.isRunning, state.speed]);
  
  useEffect(() => {
    setMetrics(calculateMetrics(state));
  }, [state]);
  
  const addProcess = (process: Omit<Process, 'id' | 'remainingTime' | 'state' | 'totalWaitTime'>) => {
    dispatch({ type: 'ADD_PROCESS', payload: process });
  };
  
  const removeProcess = (id: string) => {
    dispatch({ type: 'REMOVE_PROCESS', payload: id });
  };
  
  const startSimulation = () => {
    dispatch({ type: 'START_SIMULATION' });
  };
  
  const pauseSimulation = () => {
    dispatch({ type: 'PAUSE_SIMULATION' });
  };
  
  const resetSimulation = () => {
    dispatch({ type: 'RESET_SIMULATION' });
  };
  
  const stepSimulation = () => {
    dispatch({ type: 'TICK' });
  };
  
  const setSpeed = (speed: number) => {
    dispatch({ type: 'SET_SPEED', payload: speed });
  };
  
  const loadExampleProcesses = () => {
    const examples = generateExampleProcesses();
    examples.forEach(process => {
      dispatch({ type: 'ADD_PROCESS', payload: process });
    });
  };
  
  const value = {
    state,
    metrics,
    dispatch,
    addProcess,
    removeProcess,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    stepSimulation,
    setSpeed,
    loadExampleProcesses,
  };
  
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};