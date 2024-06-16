import React, { useState } from "react";
import { Button, Text, TextInput, View, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from "../constants/IndexScreenStyle"

export default function IndexScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const songs = searchTerm.split(',').map(term => ({ name: term.trim(), artist: '' }));
    try {
      const response = await fetch('http://192.168.1.107:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songs }),
      });
      const data = await response.json();
      if (data.error) {
        Alert.alert("Hata", data.error);
        setRecommendations([]);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Öneriler getirilirken hata oluştu:', error);
      Alert.alert("Hata", "Öneriler alınırken bir hata oluştu.");
    }
    setLoading(false);
  };

  return (
    
    <View style={styles.container}>
    <View>
    <Text
              style={{
                fontSize: 50,
                fontWeight: 800,
              }}>InMusic
            </Text>
    </View>
      <TextInput
        style={styles.input}
        placeholder="Şarkı isimlerini girin (virgülle ayırın)."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.buttonContainer}>
        <Button title="Arama" onPress={handleSearch} disabled={loading} />
        <Button
          title="Profil"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        style={styles.resultContainer}
        contentContainerStyle={styles.contentContainer}
        data={recommendations}
        keyExtractor={(item) => item.name + item.artists}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
            <Text style={styles.resultArtist}>{item.artists}</Text>
          </View>
        )}
      />
    </View>
  );
}

