import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: api.getMatches,
  });
}

export function useFetchFixtures() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.fetchFixtures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}

export function useLogResult() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ matchId, result }: { matchId: number; result: string }) => 
      api.logResult(matchId, result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}