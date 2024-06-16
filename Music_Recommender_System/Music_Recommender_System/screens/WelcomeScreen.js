import { Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Image } from "react-native";
import styles from "../constants/WelcomeScreenStyle";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image 
            source={require("../assets/InMusic.png")}
            style={{
              height: 400,
              width: 400,
              top: 100,
              position: "absolute",
              left: 10,
            }}
          />
          <View
            style={{
              marginVertical: 22,
              position: "absolute",
              top: 400,
              width: "100%",
              left: 20,
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: 800,
                color: COLORS.white,
                marginVertical: 30,
                left: 50,
              }}>Hoşgeldiniz
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}>            
              <Text style={styles.buttonText}>Başlayalım</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
