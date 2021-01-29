import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "./WatchedScreen.styles";
import WatchedItem from "./components/WatchedItem.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatched } from "../../store/Books/Books.actions";

const WatchedScreen = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.BooksState.watchedBooks);
  const loading = useSelector((state) => state.BooksState.loading);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      dispatch(fetchWatched());

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={styles.watchedScreenContainer}>
      <View style={styles.watchedScreenTitleContainer}>
        <Text style={styles.watchedScreenTitle}>Obserwowane</Text>
      </View>
      <View style={styles.watchedBooksListContainer}>
        {loading && <ActivityIndicator size="large" color="#f8f8f8" />}
        {!loading && books && (
          <FlatList
            style={styles.watchedBooksList}
            data={books}
            renderItem={({ item }) => {
              return <WatchedItem book={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default WatchedScreen;
