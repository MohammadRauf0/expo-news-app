import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      if (token) {
        const res = JSON.parse(token);
        if (Array.isArray(res) && res.length > 0) {
          let query_string = res.join(",");
          console.log("query_string: ", query_string);

          const response = await axios.get(
            `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
          );
          setBookmarkNews(response.data.results);
        } else {
          console.log("No valid bookmarks found");
          setBookmarkNews([]); // Clear the list if no valid bookmarks
        }
      } else {
        console.log("No bookmarks found in storage");
        setBookmarkNews([]);
      }
    } catch (error) {
      console.error("Error fetching bookmark:", error);
    } finally {
      setIsLoading(false); // Ensure loading stops regardless of the outcome
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Saved",
          headerTitleAlign: "center",
        }}
      />

      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item_${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity activeOpacity={1}>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
