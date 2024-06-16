import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { auth } from "../backend";
import COLORS from "../constants/colors";
import styles from "../constants/LoginScreenStyle";

const redirectUri = "exp://192.168.1.107:19000/--/expo-auth-session";

const spotifyConfig = {
  clientId: "2e261b2ce1ff4d74830b582e293a2f2b",
  redirectUri,
  scopes: ["user-read-email", "user-read-private", "user-top-read"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  },
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ route }) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.reset) {
      setEmail("");
      setPassword("");
    }
  }, [route.params?.reset]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Index");
      }
    });
  }, []);

  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Kullanıcı giriş yaptı", user.email);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  const handleSpotifyLogin = async () => {
    setLoading(true);
    const result = await AuthSession.startAsync({
      authUrl: `${
        spotifyConfig.serviceConfiguration.authorizationEndpoint
      }?client_id=${spotifyConfig.clientId}&redirect_uri=${encodeURIComponent(
        spotifyConfig.redirectUri
      )}&response_type=token&scope=${encodeURIComponent(
        spotifyConfig.scopes.join(" ")
      )}`,
    });

    if (result.type === "success") {
      const { access_token } = result.params;
      navigation.navigate("Rec", { accessToken: access_token });
    } else {
      console.log("Spotify Login Hatası:", result);
      Alert.alert("Spotify Login Hatası", "Spotify'a giriş yapılamadı.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.firstHead}>Merhaba,</Text>
        <Text style={styles.secondHead}>Tekrar Hoşgeldiniz</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.eposta}>E-Posta</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.eposta}>Şifre</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Giriş</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.orLine}></View>
        <Text style={styles.orText}>veya</Text>
        <View style={styles.orLine}></View>
      </View>
      <View style={styles.orSignupContainer}>
        <TouchableOpacity
          style={styles.googleContainer}
          onPress={() => console.log("Pressed")}
        >
          <Image
            style={styles.google}
            source={require("../assets/google.png")}
          />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleContainer}
          onPress={handleSpotifyLogin}
        >
          <Image
            style={styles.google}
            source={require("../assets/spotify.png")}
          />
          <Text>Spotify</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.alreadyAccount}>
          <Text style={styles.goLoginText}>Henüz bir hesabınız yok mu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.goLogin}>Kayıt ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
