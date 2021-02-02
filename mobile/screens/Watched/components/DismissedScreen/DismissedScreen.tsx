import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "./../../WatchedScreen.styles";
import WatchedItem from "../WatchedItem/WatchedItem.component";
import { useDispatch, useSelector } from "react-redux";
import {
  dismissBook,
  fetchWatched,
  restoreBook,
} from "../../../../store/Books/Books.actions";
import { LinearGradient } from "expo-linear-gradient";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native-appearance";

const DismissedScreen = () => {
  let colorScheme = useColorScheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.BooksState.dismissedBooks);
  const loading = useSelector((state) => state.BooksState.loading);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      dispatch(fetchWatched("dismissed"));

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LinearGradient
      colors={
        colorScheme === "dark"
          ? ["#1F0039", "#271c7f", "#3c0076"]
          : ["#544fff", "#ff9ce7", "#c55aff"]
      }
      start={[0.0, 1.0]}
      end={[1.0, 0.4]}
      style={styles.watchedScreenContainer}
    >
      <View style={styles.watchedBooksListContainer}>
        {loading && <ActivityIndicator size="large" color="#f8f8f8" />}
        {!loading && books && (
          <FlatList
            style={styles.watchedBooksList}
            data={books}
            renderItem={({ item }) => {
              return (
                <WatchedItem
                  onLongPress={() =>
                    showActionSheetWithOptions(
                      {
                        options: ["Przywróć", "Anuluj"],
                        cancelButtonIndex: 1,
                        icons: [
                          <MaterialIcons name={"restore"} size={24} />,
                          <MaterialIcons name={"cancel"} size={24} />,
                        ],
                      },
                      (actionIndex) => {
                        if (actionIndex === 0) {
                          dispatch(restoreBook(item.id));
                        }
                      }
                    )
                  }
                  book={item}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default DismissedScreen;
