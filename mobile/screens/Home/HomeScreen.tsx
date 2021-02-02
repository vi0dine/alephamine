import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./HomeScreen.styles";
import { watchBook } from "../../store/Books/Books.actions";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native-appearance";
import shared from "../../shared/shared.styles";

const HomeScreen = () => {
  const dispatch = useDispatch();
  let colorScheme = useColorScheme();
  const loading = useSelector((state) => state.BooksState.loading);
  const [title, setTitle] = useState(null);

  return (
    <LinearGradient
      colors={
        colorScheme === "dark"
          ? ["#1F0039", "#271c7f", "#3c0076"]
          : ["#544fff", "#ff9ce7", "#c55aff"]
      }
      start={[0.0, 1.0]}
      end={[1.0, 0.4]}
      style={styles.homeScreenContainer}
    >
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
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
          <View style={styles.searchFieldContainer}>
            <TextInput
              style={
                colorScheme === "dark" ? shared.inputLight : shared.inputDark
              }
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity
              style={
                colorScheme === "dark" ? shared.buttonLight : shared.buttonDark
              }
              onPress={() => dispatch(watchBook(title))}
            >
              <Text style={styles.searchButtonText}>Wyszukaj</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;
