import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSimulation } from '@/contexts/SimulationContext';
import { Badge } from '@/components/ui/badge';

export function SimulationHeader() {
  const { state } = useSimulation();
  const { currentTime, quantum, runningProcess, drawnTicket } = state;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Current Time */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Time</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v10l4.24 4.24" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentTime}</div>
          <p className="text-xs text-muted-foreground">time units</p>
        </CardContent>
      </Card>

      {/* Quantum */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quantum</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{quantum}</div>
          <p className="text-xs text-muted-foreground">time units</p>
        </CardContent>
      </Card>

      {/* Running Process */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Running Process</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M18 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
            <path d="m2 4 4 4" />
            <path d="m22 4-4 4" />
            <path d="M12 16v-4" />
            <path d="M8 12h8" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {runningProcess ? (
              <Badge className="bg-green-500">{runningProcess.id}</Badge>
            ) : (
              <Badge variant="outline">None</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {runningProcess 
              ? `Remaining: ${runningProcess.remainingTime}` 
              : 'No process running'}
          </p>
        </CardContent>
      </Card>

      {/* Drawn Ticket */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drawn Ticket</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M2 6h20v12H2z"></path>
            <path d="M2 12h20"></path>
            <path d="M7 12v6"></path>
            <path d="M17 12v6"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {drawnTicket !== null ? (
              <Badge className="bg-yellow-500">#{drawnTicket}</Badge>
            ) : (
              <Badge variant="outline">None</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {drawnTicket !== null ? 'Last drawn ticket' : 'No ticket drawn yet'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}