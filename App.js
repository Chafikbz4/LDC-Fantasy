import { StyleSheet, Text, View, StatusBar } from "react-native";
import Navigate from "./Navigation/Navigate";
import { Provider } from "react-redux";
import { store } from "./Store/store";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="white-content" />
        <Navigate />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
