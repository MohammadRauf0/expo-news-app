import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
      <Image
        source={{
          uri: "https://xsgames.co/randomusers/avatar.php?g=male",
        }}
        style={styles.userImage}
      />
      <View style={{gap: 3}}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userName}>John Doe!</Text>
      </View>
      </View>
      
      <TouchableOpacity onPress={() => { console.log('Notifications') }}>
        <Ionicons name='notifications-outline' size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.darkGrey,
    fontWeight: "500",
  },
  userName: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: "700",
  },
});
