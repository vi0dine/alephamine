import React from "react";
import { ImageBackground, Text, View } from "react-native";
import styles from "./WatchedItem.styles";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { BlurView } from "expo-blur";

const WatchedItem = ({ book }) => {
  const getColor = (status) => {
    switch (status) {
      case "available":
        return "#87ff6a";
      case "loaned":
        return "#9e9e9e";
      case "quarantined":
        return "#ffae4f";
    }
  };
  const formatStatus = (status) => {
    switch (status) {
      case "available":
        return "Dostępna";
      case "loaned":
        return "Niedostępna";
      case "quarantined":
        return "Kwarantanna";
    }
  };

  return (
    <BlurView intesity={100} style={styles.watchedItemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemTitleText} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.itemSubtitleText}>
          Rok wydania: {book.year || "bd."}
        </Text>
        <Text style={styles.itemSubtitleText}>
          Ilość książek: {book.books_count || "bd."}
        </Text>
        <Text style={styles.itemSubtitleText}>
          Ostatnia zmiana: {moment(book.updated_at).format("DD/MM/YY HH:mm")}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Ionicons
          name={"ios-eye"}
          color={getColor(book.loan_status)}
          size={50}
        />
        <Text
          style={{
            ...styles.itemTitleText,
            color: getColor(book.loan_status),
          }}
        >
          {formatStatus(book.loan_status)}
        </Text>
      </View>
    </BlurView>
  );
};

export default WatchedItem;
