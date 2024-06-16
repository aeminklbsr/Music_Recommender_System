import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { auth } from "../backend";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../constants/ProfileScreenStyle"

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const profile = route.params?.profile || auth.currentUser;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Kullanıcı çıkış yaptı.");
        navigation.navigate("Login", { reset: true });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {profile && profile.profileImage ? (
          <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require('../assets/spotify.png')} style={styles.profileImage} />
        )}
        <Text style={styles.profileName}>{profile ? profile.displayName : "Kullanıcı"}</Text>
        {profile && profile.email && (
          <Text style={styles.profileEmail}>{profile.email}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
