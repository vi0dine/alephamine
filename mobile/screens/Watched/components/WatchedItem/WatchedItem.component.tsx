import React from "react";
import watchedItemStyles from "./WatchedItem.styles";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import useColorScheme from "../../../../shared/hooks/useColorScheme";
import Colors from "../../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../../../../shared/components/Themed";

const WatchedItem = ({ book, onLongPress }) => {
  const theme = useColorScheme();
  const getColor = (status) => {
    switch (status) {
      case "available":
        return Colors[theme].available;
      case "loaned":
        return Colors[theme].loaned;
      case "quarantined":
        return Colors[theme].quarantined;
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
    <TouchableOpacity
      onLongPress={() => {
        onLongPress();
      }}
    >
      <View
        style={[
          watchedItemStyles.watchedItemContainer,
          {
            borderColor: Colors[theme].tint,
            backgroundColor: `${Colors[theme].tint}2F`,
          },
        ]}
      >
        <View style={watchedItemStyles.infoContainer}>
          <Text style={watchedItemStyles.itemTitleText} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={watchedItemStyles.itemSubtitleText}>
            Rok wydania: {book.year || "bd."}
          </Text>
          <Text style={watchedItemStyles.itemSubtitleText}>
            Ilość książek: {book.books_count || "bd."}
          </Text>
          <Text style={watchedItemStyles.itemSubtitleText}>
            Ostatnia zmiana: {moment(book.updated_at).format("DD/MM/YY HH:mm")}
          </Text>
        </View>
        <View style={watchedItemStyles.statusContainer}>
          <Ionicons
            name={"ios-eye"}
            color={getColor(book.loan_status)}
            size={50}
          />
          <Text
            style={{
              ...watchedItemStyles.itemTitleText,
              color: getColor(book.loan_status),
            }}
          >
            {formatStatus(book.loan_status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WatchedItem;
