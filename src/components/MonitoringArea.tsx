import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LotteryDrawHistory } from './LotteryDrawHistory';
import { TicketDistribution } from './TicketDistribution';
import { SimulationMetrics } from './SimulationMetrics';
import { TimelineVisualization } from './TimelineVisualization';

export function MonitoringArea() {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardContent className="p-4">
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="draws">Draw History</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="mt-0">
            <TimelineVisualization />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-0">
            <TicketDistribution />
          </TabsContent>
          
          <TabsContent value="draws" className="mt-0">
            <LotteryDrawHistory />
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-0">
            <SimulationMetrics />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}