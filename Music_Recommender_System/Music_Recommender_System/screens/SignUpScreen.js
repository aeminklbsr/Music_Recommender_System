import { Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { auth } from "../backend";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from 'react-native'
import styles from "../constants/SignUpScreenStyle"

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Index");
      }
    });
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Kullanıcı oluşturuldu. ", user.email);
        Alert.alert(
          'Kullanıcı Oluşturuldu!'
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.firstHead}>Merhaba,</Text>
        <Text style={styles.secondHead}>Hesap oluşturun</Text>
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
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
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
          <Text style={styles.goLoginText}>Zaten hesabınız var mı?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.goLogin}>Giriş</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
