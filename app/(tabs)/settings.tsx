import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>About</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Send Feedback</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Privacy Policy</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Terms of use</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Dark Mode</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemButtonText}>Log Out</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
});
