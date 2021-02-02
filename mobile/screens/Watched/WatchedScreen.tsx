import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ActiveScreen from "./components/ActiveScreen/ActiveScreen";
import DismissedScreen from "./components/DismissedScreen/DismissedScreen";
import { Dimensions } from "react-native";
import { fetchWatched } from "../../store/Books/Books.actions";
import { useDispatch } from "react-redux";

const initialLayout = { width: Dimensions.get("window").width };

const WatchedScreen = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Aktywne" },
    { key: "second", title: "Wyłączone" },
  ]);

  const renderScene = SceneMap({
    first: ActiveScreen,
    second: DismissedScreen,
  });

  return (
    <TabView
      style={{ paddingTop: 50, backgroundColor: "#271c7f" }}
      renderTabBar={(props) => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "white", shadowOpacity: 0 }}
            style={{
              backgroundColor: "transparent",
              shadowOpacity: 0,
              elevation: 0,
            }}
          />
        );
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => {
        setIndex(index);
        if (index === 0) {
          dispatch(fetchWatched("active"));
        } else {
          dispatch(fetchWatched("dismissed"));
        }
      }}
      initialLayout={initialLayout}
    />
  );
};

export default WatchedScreen;
