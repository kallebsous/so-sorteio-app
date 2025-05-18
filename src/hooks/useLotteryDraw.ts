import { useState, useCallback } from 'react';
import { Process } from '@/types';

interface LotteryDrawResult {
  selectedTicket: number | null;
  selectedProcess: Process | null;
}

export function useLotteryDraw() {
  const [drawHistory, setDrawHistory] = useState<Array<{
    time: number;
    ticket: number;
    processId: string;
  }>>([]);

  // Function to draw a ticket from the ready processes
  const drawTicket = useCallback((
    readyProcesses: Process[], 
    currentTime: number
  ): LotteryDrawResult => {
    if (readyProcesses.length === 0) {
      return { selectedTicket: null, selectedProcess: null };
    }

    // Collect all tickets from ready processes
    const ticketPool: Array<{ ticket: number; process: Process }> = [];
    readyProcesses.forEach(process => {
      process.tickets.forEach(ticket => {
        ticketPool.push({ ticket, process });
      });
    });

    if (ticketPool.length === 0) {
      return { selectedTicket: null, selectedProcess: null };
    }

    // Draw a random ticket
    const randomIndex = Math.floor(Math.random() * ticketPool.length);
    const { ticket: selectedTicket, process: selectedProcess } = ticketPool[randomIndex];

    // Update history
    setDrawHistory(prev => {
      const newHistory = [
        ...prev, 
        { 
          time: currentTime, 
          ticket: selectedTicket, 
          processId: selectedProcess.id 
        }
      ];
      // Keep only the latest 5 draws
      return newHistory.slice(-5);
    });

    return { selectedTicket, selectedProcess };
  }, []);

  // Function to get ticket distribution
  const getTicketDistribution = useCallback((processes: Process[]) => {
    return processes.map(process => ({
      id: process.id,
      ticketCount: process.tickets.length,
      tickets: process.tickets,
      state: process.state,
    }));
  }, []);

  return {
    drawTicket,
    drawHistory,
    getTicketDistribution,
  };
}