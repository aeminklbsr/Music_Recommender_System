import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    profileEmail: {
      fontSize: 16,
      color: '#666',
      marginTop: 5,
    },
    section: {
      marginVertical: 10,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sectionItem: {
      paddingVertical: 15,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    button: {
      backgroundColor: "#0782F9",
      padding: 15,
      alignItems: "center",
      borderRadius: 10,
      width: "100%",
      marginTop: 30,
    },
    buttonText: {
      color: "white",
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  