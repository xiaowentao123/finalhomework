import { Trip } from '@/types';

const mockTrips: Trip[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Trip ${i + 1}`,
  content: `This is the content for trip ${i + 1}.`,
  image: `https://picsum.photos/200/300?random=${i}`,
  createdAt: new Date().toISOString(),
}));

export const fetchTrips = async (page: number, limit: number, query: string = '') => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const filtered = query
    ? mockTrips.filter(trip => trip.title.toLowerCase().includes(query.toLowerCase()))
    : mockTrips;
  const start = (page - 1) * limit;
  return {
    trips: filtered.slice(start, start + limit),
    total: filtered.length,
  };
};

export const fetchTripById = async (id: string): Promise<Trip> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const trip = mockTrips.find(trip => trip.id === id);
  if (!trip) throw new Error('Trip not found');
  return trip;
};

export const createTrip = async (trip: Omit<Trip, 'id' | 'createdAt'>): Promise<Trip> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newTrip = {
    ...trip,
    id: `${mockTrips.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  mockTrips.push(newTrip);
  return newTrip;
};

export const updateTrip = async (id: string, trip: Partial<Trip>): Promise<Trip> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockTrips.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Trip not found');
  mockTrips[index] = { ...mockTrips[index], ...trip };
  return mockTrips[index];
};

export const deleteTrip = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockTrips.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Trip not found');
  mockTrips.splice(index, 1);
};
