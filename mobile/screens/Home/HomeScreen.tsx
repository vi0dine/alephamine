import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import homeScreenStyles from "./HomeScreen.styles";
import { watchBook } from "../../store/Books/Books.actions";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Button, TextInput } from "../../shared/components/Themed";
import sharedStyles from "../../shared/shared.styles";
import Colors from "../../constants/Colors";
import axios from "axios";
import * as _ from "lodash";
import useColorScheme from "../../shared/hooks/useColorScheme";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const loading = useSelector((state) => state.BooksState.loading);
  const [title, setTitle] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [books, setBooks] = useState([]);

  const fetchForAutocomplete = async (q) => {
    const { data } = await axios.request({
      url: "/books/autocomplete",
      params: {
        q: q,
      },
      method: "GET",
    });

    setBooks(data?.books);
    setFetching(false);
  };

  const debouncedFetchForAutocomplete = useCallback(
    _.debounce(fetchForAutocomplete, 1000),
    []
  );

  return (
    <View
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={homeScreenStyles.homeScreenContainer}
    >
      <View style={homeScreenStyles.descriptionContainer}>
        <Text style={homeScreenStyles.descriptionText}>
          W poniższym polu należy wpisać DOKŁADNY tytuł książki występującej w
          katalogu Aleph UO. Po naciśnięciu przycisku i potwierdzeniu
          zgłoszenia, książka zostanie dodana do obserwowanych pozycji i
          będziesz informowany o zmianach jej statusu zgodnie z Twoimi
          ustawieniami powiadomień.{"\n\n"}Na Twoim koncie został ustalony limit
          aby ograniczyć usterki mechanizmu sprawdzającego status - rozważnie
          wybieraj więc obserwowane książki.
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={homeScreenStyles.searchFieldContainer}>
            <View
              style={{
                position: "absolute",
                right: 5,
                top: 10,
                width: 40,
                height: 40,
              }}
            >
              <ActivityIndicator />
            </View>
            <TextInput
              label={"Tytuł"}
              placeholder={"Tytuł"}
              value={title}
              onChangeText={(text) => {
                setFetching(true);
                setTitle(text);
                debouncedFetchForAutocomplete(text);
              }}
            />
            {books?.length > 0 ? (
              <View>
                <FlatList
                  keyExtractor={(item) => item?.title}
                  data={books}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          paddingVertical: 4,
                          marginVertical: 4,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors[theme]["tint"],
                        }}
                        onPress={() => {
                          setTitle(item?.title);
                          setBooks([]);
                        }}
                      >
                        <Text>{item?.title}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : (
              <>
                {fetching && (
                  <ActivityIndicator color={Colors[theme]["text"]} />
                )}
              </>
            )}
          </View>
          <View style={homeScreenStyles.searchButtonContainer}>
            <Button
              onPress={() => {
                setTitle(null);
                dispatch(watchBook(title));
              }}
            >
              <Text style={sharedStyles.buttonText}>Wyszukaj</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
