import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import homeScreenStyles from "./HomeScreen.styles";
import { watchBook } from "../../store/Books/Books.actions";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, Button } from "../../shared/components/Themed";
import sharedStyles from "../../shared/shared.styles";
import Colors from "../../constants/Colors";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.BooksState.loading);
  const [title, setTitle] = useState(null);

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
            <TextInput
              label={"Tytuł"}
              placeholder={"Tytuł"}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={homeScreenStyles.searchButtonContainer}>
            <Button onPress={() => dispatch(watchBook(title))}>
              <Text style={sharedStyles.buttonText}>Wyszukaj</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
