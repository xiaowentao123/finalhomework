import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';

export default function NoteCard({ note, width, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ width, marginBottom: 12 }}>
      <Image
        source={{ uri: note.imageUrl }}
        style={{ width: '100%', height: 160, borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text style={{ marginTop: 6, fontSize: 14, fontWeight: 'bold' }}>{note.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Image
          source={{ uri: note.author.avatarUrl }}
          style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }}
        />
        <Text style={{ fontSize: 12 }}>{note.author.nickname}</Text>
      </View>
    </TouchableOpacity>
  );
}
