import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../constants/RecScreenStyle"

const fetchTopTracks = async (accessToken) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Spotify API isteği başarısız oldu");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("En iyi şarkılar bulunamadı");
  }

  return data.items.map((item) => ({
    name: item.name,
    artist: item.artists.map((artist) => artist.name).join(", "),
  }));
};

const fetchSpotifyProfile = async (accessToken) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Spotify API isteği başarısız oldu");
  }

  const data = await response.json();

  return {
    displayName: data.display_name,
    profileImage: data.images.length > 0 ? data.images[0].url : null,
  };
};

const fetchRecommendations = async (songs) => {
  try {
    console.log("Şarkılar sunucuya gönderiliyor:", songs); 
    const response = await fetch("http://192.168.1.107:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songs }),
    });

    const data = await response.json();
    console.log("Sunucudan öneriler alındı: ", data); 

    if (!data.recommendations || !data.recommendations.length) {
      throw new Error("Hiçbir öneri bulunamadı");
    }

    return data;
  } catch (error) {
    console.error("Öneriler getirilirken hata oluştu:", error);
    return { error: "Veritabanında mevcut değil" };
  }
};

const RecScreen = ({ route }) => {
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [missingSongs, setMissingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const { accessToken } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const spotifyTracks = await fetchTopTracks(accessToken);
        setTracks(spotifyTracks);
        const recs = await fetchRecommendations(spotifyTracks);
        if (recs.error) {
          setError(recs.error);
          setRecommendations([]);
          setMissingSongs(recs.missing_songs || []);
        } else {
          setRecommendations(recs.recommendations || []);
          setMissingSongs(recs.missing_songs || []);
          setError(null);
        }
        const profileData = await fetchSpotifyProfile(accessToken);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [accessToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={{ fontSize: 50, fontWeight: "800", padding: 20 }}>InMusic</Text>
      </View>
      <Text style={styles.titleMost}>Kullanıcının en çok dinlediği 5 şarkı</Text>
      {tracks.length === 0 ? (
        <Text style={styles.songText}>Mevcut veriniz bulunmamaktadır</Text>
      ) : (
        tracks.map((track, index) => (
          <Text key={index} style={styles.songText}>
            {index + 1}- {track.name} - {track.artist}
          </Text>
        ))
      )}
      <Text style={styles.titleRec}>Önerilen Şarkılar</Text>
      {error ? (
        <Text style={styles.songText}>{error}</Text>
      ) : (
        recommendations.map((rec, index) => (
          <Text key={index} style={styles.songText}>
            {index + 1}- {rec.name} - {rec.artists}
          </Text>
        ))
      )}
      <Text style={styles.titleData}>Veritabanında mevcut olmayan şarkılar</Text>
      {missingSongs.length > 0 ? (
        missingSongs.map((song, index) => (
          <Text key={index} style={styles.songText}>
            {index + 1}- {song}
          </Text>
        ))
      ) : (
        <Text style={styles.songText}>Şarkı Bulunamadı</Text>
      )}
      <TouchableOpacity
        style={styles.profileButtonContainer}
        onPress={() => navigation.navigate("Profile", { profile })}
      >
        <Text style={styles.profileButton}>Profil sayfasına git</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default RecScreen;
