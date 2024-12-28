import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  withHorizontalPadding?: boolean;
  setSearchQuary?: Function;
};

const SearchBar = ({
  withHorizontalPadding,
  setSearchQuary = () => {},
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchBarText}
          autoCapitalize="none"
          onChangeText={(quary) => setSearchQuary(quary)}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchBarText: {
    fontSize: 16,
    color: Colors.darkGrey,
    fontWeight: "500",
  },
});
