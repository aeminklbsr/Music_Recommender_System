import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
    titleContainer: {
      top: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    firstHead: {
      fontSize: 20,
    },
    secondHead: {
      fontSize: 25,
      fontWeight: "bold",
    },
    container: {
      flex: 1,
    },
    inputContainer: {
      width: "80%",
      left: 40,
      top: 40,
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 5,
      borderRadius: 10,
      marginBottom: 10,
    },
    button: {
      width: "70%",
      marginTop: 300,
      backgroundColor: "#0782F9",
      padding: 15,
      alignItems: "center",
      borderRadius: 30,
      left: 65,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 700,
      color: "white",
    },
    goLogin: {
      fontSize: 16,
      color: COLORS.primary,
      left: 5,
      fontWeight: "bold",
    },
    goLoginText: {
      fontSize: 16,
      color: COLORS.black,
    },
    googleContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 52,
      borderWidth: 1,
      borderColor: COLORS.grey,
      marginRight: 4,
      borderRadius: 10,
    },
    google: {
      height: 36,
      width: 36,
      marginRight: 8,
    },
    facebookContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 52,
      borderWidth: 1,
      borderColor: COLORS.grey,
      marginRight: 4,
      borderRadius: 10,
    },
    facebook: {
      height: 36,
      width: 36,
      marginRight: 8,
    },
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    orText: {
      fontSize: 15,
    },
    orLine: {
      flex: 1,
      height: 1,
      backgroundColor: COLORS.grey,
      marginHorizontal: 10,
    },
    alreadyAccount: {
      flexDirection: "row",
      justifyContent: "center",
      top: 30,
    },
    orSignupContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });
  