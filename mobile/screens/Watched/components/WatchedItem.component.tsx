import React from "react";
import { Text, View } from "react-native";
import styles from "./WatchedItem.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

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
    <View style={styles.watchedItemContainer}>
      <LinearGradient
        style={styles.watchedItemBackground}
        colors={["#f8f8f8", "#4e0cbd"]}
        start={[0.0, 1.0]}
        end={[0.7, 0.0]}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.itemTitleText}>{book.title}</Text>
          <Text style={styles.itemTitleText}>
            Ilość książek: {book.books_count}
          </Text>
          <Text style={styles.itemTitleText}>
            {moment(book.updated_at).format("DD/MM/YYYY HH:mm")}
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
      </LinearGradient>
    </View>
  );
};

export default WatchedItem;
