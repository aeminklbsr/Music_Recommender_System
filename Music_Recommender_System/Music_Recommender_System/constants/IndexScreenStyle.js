import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: '#f5f5f5',
      padding: 60,
    },
    input: {
      height: 40,
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    resultContainer: {
      width: "100%",
    },
    contentContainer: {
      alignItems: "center",
    },
    resultItem: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    resultArtist: {
      fontSize: 16,
      color: '#666',
    },
  });
  