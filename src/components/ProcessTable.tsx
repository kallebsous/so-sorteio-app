import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/contexts/SimulationContext';
import { Process } from '@/types';

export function ProcessTable() {
  const { state, removeProcess } = useSimulation();
  const { processes } = state;

  // Function to render the process state with appropriate styling
  const renderProcessState = (state: Process['state']) => {
    switch (state) {
      case 'READY':
        return <Badge variant="outline">Ready</Badge>;
      case 'RUNNING':
        return <Badge className="bg-green-500">Running</Badge>;
      case 'FINISHED':
        return <Badge variant="secondary">Finished</Badge>;
      default:
        return <Badge variant="outline">{state}</Badge>;
    }
  };

  // Calculate the progress percentage for a process
  const calculateProgress = (process: Process) => {
    const { burstTime, remainingTime } = process;
    return ((burstTime - remainingTime) / burstTime) * 100;
  };

  return (
    <Table>
      <TableCaption>List of all processes in the simulation</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead>Burst Time</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Tickets</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Wait Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {processes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No processes yet. Add a process to start.
            </TableCell>
          </TableRow>
        ) : (
          processes.map((process) => (
            <TableRow key={process.id}>
              <TableCell className="font-medium">{process.id.substring(0, 6)}</TableCell>
              <TableCell>{process.arrivalTime}</TableCell>
              <TableCell>{process.burstTime}</TableCell>
              <TableCell>{process.remainingTime}</TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <Progress value={calculateProgress(process)} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {process.tickets.length > 5 ? (
                    <>
                      {process.tickets.slice(0, 5).map((ticket) => (
                        <Badge key={ticket} variant="outline" className="text-xs">
                          #{ticket}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        +{process.tickets.length - 5} more
                      </Badge>
                    </>
                  ) : (
                    process.tickets.map((ticket) => (
                      <Badge key={ticket} variant="outline" className="text-xs">
                        #{ticket}
                      </Badge>
                    ))
                  )}
                </div>
              </TableCell>
              <TableCell>{renderProcessState(process.state)}</TableCell>
              <TableCell>{process.totalWaitTime}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProcess(process.id)}
                  disabled={state.isRunning}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}