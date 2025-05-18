import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSimulation } from '@/contexts/SimulationContext';

export function TimelineVisualization() {
  const { state } = useSimulation();
  const { processes, currentTime } = state;
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the timeline as simulation progresses
  useEffect(() => {
    if (timelineRef.current && currentTime > 0) {
      const { scrollWidth, clientWidth } = timelineRef.current;
      timelineRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, [currentTime]);

  // Maximum time to display on timeline
  const maxTime = Math.max(20, currentTime);

  // Function to determine the color for a process
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

  // Generate a timeline for each process
  const generateTimeline = () => {
    return processes.map((process, index) => {
      // Generate an array of time units for this process
      const timeUnits = Array.from({ length: maxTime + 1 }, (_, timeUnit) => {
        // Determine the state of the process at this time unit
        if (timeUnit < process.arrivalTime) {
          return { state: 'not-arrived', timeUnit };
        }
        
        if (process.state === 'FINISHED' && process.endTime !== undefined && timeUnit > process.endTime) {
          return { state: 'finished', timeUnit };
        }
        
        // Find corresponding history entry with this process
        const wasRunning = state.history.some(h => 
          h.time === timeUnit && h.processId === process.id
        );
        
        if (wasRunning) {
          return { state: 'running', timeUnit };
        }
        
        if (timeUnit <= currentTime && timeUnit >= process.arrivalTime) {
          return { state: 'ready', timeUnit };
        }
        
        return { state: 'future', timeUnit };
      });
      
      return { process, timeUnits, color: getProcessColor(index) };
    });
  };
  
  const timeline = generateTimeline();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Process Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {processes.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No processes to display on the timeline.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Time markers */}
            <div className="flex border-b">
              <div className="w-[100px] flex-shrink-0"></div>
              <div 
                className="flex flex-grow overflow-x-auto scrollbar-thin" 
                ref={timelineRef}
              >
                {Array.from({ length: maxTime + 1 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 text-center text-xs ${
                      i === currentTime ? 'font-bold text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Process timelines */}
            {timeline.map(({ process, timeUnits, color }) => (
              <div key={process.id} className="flex">
                <div className="w-[100px] flex-shrink-0 text-sm truncate py-1">
                  {process.id.substring(0, 6)}
                </div>
                <div className="flex flex-grow overflow-x-auto scrollbar-thin">
                  {timeUnits.map(({ state, timeUnit }) => (
                    <div 
                      key={timeUnit} 
                      className={`w-8 h-6 border-r ${
                        state === 'running' 
                          ? color
                          : state === 'ready' 
                          ? 'bg-muted' 
                          : state === 'finished' 
                          ? 'bg-secondary opacity-30'
                          : 'bg-transparent'
                      }`}
                      title={`Process ${process.id.substring(0, 6)} at time ${timeUnit}: ${state}`}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-chart-1 mr-1"></div>
                <span>Running</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-muted mr-1"></div>
                <span>Ready</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary opacity-30 mr-1"></div>
                <span>Finished</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border mr-1"></div>
                <span>Not arrived</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}