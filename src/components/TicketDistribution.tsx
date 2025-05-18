import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSimulation } from '@/contexts/SimulationContext';

export function TicketDistribution() {
  const { state } = useSimulation();
  const { processes } = state;

  // Group tickets by process
  const ticketDistribution = processes.map((process) => ({
    id: process.id,
    ticketCount: process.tickets.length,
    tickets: process.tickets,
    state: process.state,
  }));

  // Calculate total tickets
  const totalTickets = ticketDistribution.reduce(
    (total, process) => total + process.ticketCount,
    0
  );

  // Different colors for different processes
  const getProcessColor = (index: number) => {
    const colors = [
      'bg-chart-1',
      'bg-chart-2',
      'bg-chart-3',
      'bg-chart-4',
      'bg-chart-5',
    ];
    return colors[index % colors.length];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ticket Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {totalTickets === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No tickets allocated yet. Add processes to see ticket distribution.
          </div>
        ) : (
          <>
            {/* Visualization */}
            <div className="h-6 w-full rounded-md overflow-hidden flex mb-4">
              {ticketDistribution.map((process, index) => {
                // Skip if process has no tickets
                if (process.ticketCount === 0) return null;
                
                // Calculate percentage width
                const width = (process.ticketCount / totalTickets) * 100;
                
                return (
                  <div
                    key={process.id}
                    className={`${getProcessColor(index)} ${
                      process.state === 'FINISHED' ? 'opacity-50' : ''
                    }`}
                    style={{ width: `${width}%` }}
                    title={`${process.id}: ${process.ticketCount} tickets (${width.toFixed(1)}%)`}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ticketDistribution.map((process, index) => (
                <div
                  key={process.id}
                  className="flex items-center space-x-2"
                >
                  <div
                    className={`h-3 w-3 rounded-full ${getProcessColor(index)}`}
                  />
                  <span className="text-sm truncate">
                    {process.id.substring(0, 6)}
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    {process.ticketCount} tickets
                  </Badge>
                  <Badge
                    className={
                      process.state === 'RUNNING'
                        ? 'bg-green-500'
                        : process.state === 'FINISHED'
                        ? 'bg-secondary'
                        : 'bg-muted'
                    }
                  >
                    {process.state}
                  </Badge>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}