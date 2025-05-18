import React from 'react';
import { SimulationHeader } from '@/components/SimulationHeader';
import { SimulationControls } from '@/components/SimulationControls';
import { ProcessTable } from '@/components/ProcessTable';
import { MonitoringArea } from '@/components/MonitoringArea';
import { SimulationProvider } from '@/contexts/SimulationContext';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <SimulationProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <h1 className="mr-4 text-xl font-semibold">
              Simulador de Escalonamento por Loteria
            </h1>
          </div>
        </header>
        <main className="flex-1">
          <div className="container py-6 space-y-6">
            <SimulationHeader />
            <Separator />
            <SimulationControls />
            <MonitoringArea />
            <ProcessTable />
          </div>
        </main>
        <Toaster />
      </div>
    </SimulationProvider>
  );
}

export default App;