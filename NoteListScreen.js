import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, TextInput, View } from 'react-native';
import NoteCard from '../components/NoteCard';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32) / 2;

export default function NoteListScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const fetchNotes = async ({ pageParam = 1 }) => {
    const res = await axios.get(`https://yourapi.com/api/notes`, {   //后端开发提供API
      params: { page: pageParam, search },
    });
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['notes', search], fetchNotes, {
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
  });

  const notes = data?.pages.flatMap((page) => page.notes) || [];

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <TextInput
        placeholder="搜索游记或作者"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={refetch}
        style={{ margin: 12, borderWidth: 1, padding: 10, borderRadius: 10 }}
      />
      <FlatList
        data={notes}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 12 }}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            width={cardWidth}
            onPress={() => navigation.navigate('NoteDetail', { id: item.id })}
          />
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
