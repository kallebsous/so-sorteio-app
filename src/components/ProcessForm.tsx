import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSimulation } from '@/contexts/SimulationContext';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome do processo é obrigatório',
  }),
  arrivalTime: z.coerce.number().min(0, {
    message: 'Tempo de chegada deve ser maior ou igual a 0',
  }),
  burstTime: z.coerce.number().min(1, {
    message: 'Tempo de execução deve ser pelo menos 1',
  }),
  ticketCount: z.coerce.number().min(1, {
    message: 'Deve ter pelo menos 1 ticket',
  }).max(100, {
    message: 'Não pode ter mais de 100 tickets',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ProcessForm() {
  const { addProcess, state } = useSimulation();
  const { toast } = useToast();
  
  const generateUniqueTickets = (count: number): number[] => {
    const usedTickets = state.processes.flatMap(p => p.tickets);
    const tickets: number[] = [];
    
    let maxAttempts = count * 2;
    while (tickets.length < count && maxAttempts > 0) {
      const ticket = Math.floor(Math.random() * 1000) + 1;
      if (!usedTickets.includes(ticket) && !tickets.includes(ticket)) {
        tickets.push(ticket);
      }
      maxAttempts--;
    }
    
    if (tickets.length < count) {
      const highestTicket = Math.max(...usedTickets, 0);
      for (let i = tickets.length; i < count; i++) {
        tickets.push(highestTicket + i + 1);
      }
    }
    
    return tickets;
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      arrivalTime: 0,
      burstTime: 5,
      ticketCount: 5,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    const tickets = generateUniqueTickets(values.ticketCount);
    
    addProcess({
      name: values.name,
      arrivalTime: values.arrivalTime,
      burstTime: values.burstTime,
      tickets,
    });
    
    toast({
      title: 'Processo Adicionado',
      description: `${values.name} foi adicionado com ${values.ticketCount} tickets`,
    });
    
    form.reset({
      name: '',
      arrivalTime: values.arrivalTime,
      burstTime: values.burstTime,
      ticketCount: values.ticketCount,
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Processo</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Editor de Texto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="arrivalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de Chegada</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="burstTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de Execução</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="ticketCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Tickets</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Adicionar Processo</Button>
      </form>
    </Form>
  );
}