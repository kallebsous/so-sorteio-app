import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSimulation } from '@/contexts/SimulationContext';

export function SimulationMetrics() {
  const { metrics } = useSimulation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Throughput */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">Throughput</div>
            <div className="text-sm font-medium">
              {metrics.throughput.toFixed(3)} processes/time unit
            </div>
          </div>
          <Progress value={Math.min(metrics.throughput * 100, 100)} />
        </div>
        
        {/* Average Response Time */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">Avg. Response Time</div>
            <div className="text-sm font-medium">
              {metrics.averageResponseTime.toFixed(2)} time units
            </div>
          </div>
          <Progress 
            value={
              metrics.averageResponseTime > 0 
                ? Math.max(100 - (metrics.averageResponseTime * 10), 5) 
                : 0
            } 
          />
        </div>
        
        {/* CPU Utilization */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">CPU Utilization</div>
            <div className="text-sm font-medium">
              {metrics.cpuUtilization.toFixed(1)}%
            </div>
          </div>
          <Progress value={metrics.cpuUtilization} />
        </div>
        
        {/* Fairness Index */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">Fairness Index</div>
            <div className="text-sm font-medium">
              {metrics.fairnessIndex.toFixed(3)}
            </div>
          </div>
          <Progress value={metrics.fairnessIndex * 100} />
        </div>
        
        {/* Average Wait Time */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">Avg. Wait Time</div>
            <div className="text-sm font-medium">
              {metrics.averageWaitTime.toFixed(2)} time units
            </div>
          </div>
          <Progress 
            value={
              metrics.averageWaitTime > 0 
                ? Math.max(100 - (metrics.averageWaitTime * 5), 5) 
                : 100
            } 
          />
        </div>
      </CardContent>
    </Card>
  );
}