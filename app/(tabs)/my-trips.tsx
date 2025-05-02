import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { useTrips, useCreateTrip, useUpdateTrip, useDeleteTrip } from '@/hooks/useTrips';
import { TripCard } from '@/components/TripCard';
import { TripForm } from '@/components/TripForm';
import { Trip } from '@/types';

export default function MyTrips() {
  const { data } = useTrips();
  const { mutate: createTrip } = useCreateTrip();
  const { mutate: updateTrip } = useUpdateTrip();
  const { mutate: deleteTrip } = useDeleteTrip();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const trips = data?.pages.flatMap(page => page.trips) || [];

  const handleSubmit = (values: Omit<Trip, 'id' | 'createdAt'>) => {
    if (editingTrip) {
      updateTrip({ id: editingTrip.id, trip: values });
    } else {
      createTrip(values);
    }
    setIsFormOpen(false);
    setEditingTrip(null);
  };

  return (
    <Box className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">My Trips</Text>
      <Button onPress={() => setIsFormOpen(true)} className="mb-4">
        <ButtonText>Add New Trip</ButtonText>
      </Button>
      {isFormOpen && (
        <TripForm
          initialValues={editingTrip}
          onSubmit={handleSubmit}
        /> 
      )}
      <FlatList
        data={trips}
        renderItem={({ item }) => (
          <Box className="flex-row justify-between items-center">
            <TripCard trip={item} />
            <Box className="flex-row">
              <Button
                size="sm"
                onPress={() => {
                  setEditingTrip(item);
                  setIsFormOpen(true);
                }}
                className="mr-2"
              >
                <ButtonText>Edit</ButtonText>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() => deleteTrip(item.id)}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
}
