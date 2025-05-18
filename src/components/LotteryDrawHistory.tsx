import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSimulation } from '@/contexts/SimulationContext';

export function LotteryDrawHistory() {
  const { state } = useSimulation();
  const { history } = state;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Lottery Draw History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No draws yet. Start the simulation to see the lottery in action.
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((draw, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md bg-muted/50"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground text-sm">Time {draw.time}</span>
                  <Badge className="bg-yellow-500">Ticket #{draw.ticket}</Badge>
                </div>
                <Badge variant="outline">
                  Process {draw.processId ? draw.processId.substring(0, 6) : 'None'}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}