import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import NewsList, { NewsItem } from "@/components/NewsList";

type Props = {};

const Search = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }
      if (country) {
        params.append("country", country);
      }
      if (query) {
        params.append("q", query);
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${
        process.env.EXPO_PUBLIC_API_KEY
      }&language=en&image=1&removeduplicate=1&size=10&${params.toString()}`;
      console.log("Request URL:", URL);

      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error fetching news:", error.message);
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
          title: "Search",
          headerTitleAlign: "center",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={news}
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
