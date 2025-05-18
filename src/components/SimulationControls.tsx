import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, Pause, FastForward, RotateCcw, Plus, 
  ChevronDown, Timer, Database
} from 'lucide-react-native';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProcessForm } from './ProcessForm';
import { useSimulation } from '@/contexts/SimulationContext';
import { useToast } from '@/hooks/use-toast';

export function SimulationControls() {
  const { 
    state, 
    startSimulation, 
    pauseSimulation, 
    resetSimulation, 
    stepSimulation,
    setSpeed,
    loadExampleProcesses
  } = useSimulation();
  
  const { toast } = useToast();
  const { isRunning, speed } = state;

  const speedOptions = [
    { label: '0.5x (Lento)', value: 2000 },
    { label: '1x (Normal)', value: 1000 },
    { label: '2x (Rápido)', value: 500 },
    { label: '4x (Muito Rápido)', value: 250 },
  ];

  const getCurrentSpeedLabel = () => {
    const option = speedOptions.find(option => option.value === speed);
    return option ? option.label : 'Personalizado';
  };

  const handleLoadExample = () => {
    loadExampleProcesses();
    toast({
      title: 'Processos de exemplo carregados',
      description: '10 processos foram adicionados ao simulador',
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {isRunning ? (
        <Button onClick={pauseSimulation} variant="outline">
          <Pause className="mr-2 h-4 w-4" />
          Pausar
        </Button>
      ) : (
        <Button onClick={startSimulation} variant="default">
          <Play className="mr-2 h-4 w-4" />
          Iniciar
        </Button>
      )}
      
      <Button 
        onClick={stepSimulation} 
        variant="outline" 
        disabled={isRunning}
        title="Avançar uma unidade de tempo"
      >
        <FastForward className="mr-2 h-4 w-4" />
        Passo
      </Button>
      
      <Button 
        onClick={resetSimulation} 
        variant="outline"
        title="Reiniciar simulação"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reiniciar
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Timer className="mr-2 h-4 w-4" />
            Velocidade: {getCurrentSpeedLabel()}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {speedOptions.map((option) => (
            <DropdownMenuItem 
              key={option.value}
              onClick={() => setSpeed(option.value)}
              className={speed === option.value ? "bg-muted" : ""}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={isRunning}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Processo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Processo</DialogTitle>
          </DialogHeader>
          <ProcessForm />
        </DialogContent>
      </Dialog>

      <Button 
        onClick={handleLoadExample} 
        variant="outline" 
        disabled={isRunning}
      >
        <Database className="mr-2 h-4 w-4" />
        Carregar Exemplo
      </Button>
    </div>
  );
}