import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";
import { StatusBar } from "expo-status-bar";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setnews] = useState<NewsDataType[]>([]);

  const [isBreakingNewsLoading, setIsBreakingNewsLoading] =
    useState<boolean>(true);
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(true);

  // Delay function
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      await getBreakingNews(); // Fetch breaking news first
      await delay(2000); // Add a 2-second delay
      await getNews(); // Then fetch general news
    };

    fetchDataWithDelay();
  }, []);

  const getBreakingNews = async () => {
    setIsBreakingNewsLoading(true);
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error: any) {
      console.log("Error fetching breaking news:", error.message);
    } finally {
      setIsBreakingNewsLoading(false);
    }
  };

  const getNews = async (category: string = "") => {
    setIsNewsLoading(true);
    try {
      const categoryParam = category ? `&category=${category}` : "";
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryParam}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setnews(response.data.results);
      }
    } catch (error: any) {
      console.log("Error fetching news:", error.message);
    } finally {
      setIsNewsLoading(false);
    }
  };

  const onCategoryChange = (category: string) => {
    console.log("Selected category:", category);
    setnews([]); // Clear existing news while loading new category news
    getNews(category); // Fetch news for the selected category
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <StatusBar style="dark" />
      <Header />
      <SearchBar withHorizontalPadding={true} />
      {isBreakingNewsLoading ? (
        <Loading size={"large"} color={"#FF4C4C"} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      <Categories onCategoryChange={onCategoryChange} />
      <NewsList newsList={news} />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
