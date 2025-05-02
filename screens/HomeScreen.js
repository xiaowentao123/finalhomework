import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import TravelCard from '../components/TravelCard';

export default function HomeScreen() {
  const [travelogues, setTravelogues] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTravelogues = async (pageNum, searchQuery = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://your-backend-url/api/travelogues', {
        params: { page: pageNum, search: searchQuery },
      });
      const data = response.data; // 修复：使用 'data'
      setTravelogues(pageNum === 1 ? data : [...travelogues, ...data]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTravelogues(1, search);
  }, [search]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(page + 1);
      fetchTravelogues(page + 1, search);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <SearchBar onSearch={setSearch} />
      <MasonryList
        data={travelogues}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TravelCard item={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
    </View>
  );
}
