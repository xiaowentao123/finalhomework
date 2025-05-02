import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTrips, fetchTripById, createTrip, updateTrip, deleteTrip } from '@/lib/api';
import { Trip } from '@/types';

export const useTrips = (query: string = '') => {
  return useInfiniteQuery({
    queryKey: ['trips', query],
    queryFn: ({ pageParam = 1 }) => fetchTrips(pageParam, 10, query),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.trips.length === 10 ? nextPage : undefined;
    },
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => fetchTripById(id),
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, trip }: { id: string; trip: Partial<Trip> }) => updateTrip(id, trip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
};
