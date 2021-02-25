import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, FlatList } from "react-native";
import styles from "../../WatchedScreen.styles";
import WatchedItem from "../../components/WatchedItem/WatchedItem.component";
import { useDispatch, useSelector } from "react-redux";
import {
  dismissBook,
  fetchWatched,
} from "../../../../store/Books/Books.actions";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "../../../../shared/components/Themed";
import Colors from "../../../../constants/Colors";
import OverlayLoader from "../../../../shared/components/OverlayLoader";

const ActiveScreen = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.BooksState.watchedBooks);
  const loading = useSelector((state) => state.BooksState.loading);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      dispatch(fetchWatched("active"));

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={styles.watchedScreenContainer}
    >
      <View style={styles.watchedBooksListContainer}>
        {loading && <OverlayLoader message={"Ładowanie"} />}
        {books && (
          <FlatList
            style={styles.watchedBooksList}
            data={books}
            renderItem={({ item }) => {
              return (
                <WatchedItem
                  onLongPress={() =>
                    showActionSheetWithOptions(
                      {
                        options: ["Usuń", "Anuluj"],
                        destructiveButtonIndex: 0,
                        cancelButtonIndex: 1,
                        icons: [
                          <MaterialIcons
                            name={"delete"}
                            size={24}
                            color={"#ff0000"}
                          />,
                          <MaterialIcons name={"cancel"} size={24} />,
                        ],
                      },
                      (actionIndex) => {
                        if (actionIndex === 0) {
                          dispatch(dismissBook(item.id));
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
    </View>
  );
};

export default ActiveScreen;
