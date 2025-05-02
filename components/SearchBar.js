import React from 'react';
import { Input, InputField } from '@gluestack-ui/themed';
import { View } from 'react-native';

export default function SearchBar({ onSearch }) {
  return (
    <View className="p-4">
      <Input variant="outline" size="md">
        <InputField
          placeholder="搜索游记..."
          onChangeText={onSearch}
          className="text-gray-700"
        />
      </Input>
    </View>
  );
}
