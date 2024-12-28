import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { NewsDataType } from "@/types";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    if (id) {
      getNews();
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(news[0].article_id);
    }
  }, [isLoading]);

  const cache = new Map();

  const getNews = async () => {
    if (!id) {
      console.log("Invalid ID");
      return;
    }

    if (cache.has(id)) {
      setNews(cache.get(id));
      setIsLoading(false);
      return;
    }

    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        cache.set(id, response.data.results); // Cache the result
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error fetching news:", error.message);
    }
  };

  const saveBookmark = async (newsId: string) => {
    try {
      setBookmark(true);

      const token = await AsyncStorage.getItem("bookmark");
      const res = token ? JSON.parse(token) : [];

      if (Array.isArray(res)) {
        const data = res.find((value: string) => value === newsId);
        if (!data) {
          res.push(newsId);
          await AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("News Saved!");
        } else {
          alert("News is already bookmarked!");
        }
      } else {
        const bookmarks = [newsId];
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        alert("News Saved!");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
      alert("Failed to save bookmark. Please try again.");
    }
  };

  const removeBookmark = async (newsId: string) => {
    setBookmark(false);

    const token = await AsyncStorage.getItem("bookmark");
    if (token) {
      const res = JSON.parse(token);
      const updatedBookmarks = res.filter((id: string) => id !== newsId);
      await AsyncStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      alert("News Unsaved!");
    }
  };

  const renderBookmark = async (newsId: string) => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      if (token) {
        const res = JSON.parse(token);
        if (Array.isArray(res)) {
          const data = res.find((value: string) => value === newsId);
          if (data) {
            setBookmark(true);
          } else {
            setBookmark(false);
          }
        }
      } else {
        setBookmark(false);
      }
    } catch (error) {
      console.error("Error rendering bookmark:", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                bookmark
                  ? removeBookmark(news[0].article_id)
                  : saveBookmark(news[0].article_id);
              }}
            >
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={22}
                color={bookmark ? "red" : Colors.black}
              />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInformation}>
              {Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInformation}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImage} />
          <Text style={styles.newsContent}>{news[0].description}</Text>
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInformation: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
