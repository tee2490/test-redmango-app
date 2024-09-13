import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { MainNavigators } from "./src/navigates";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./src/common";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-BlackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return <Text>Font loading...</Text>;
  }

  return (
    <Provider store={store}>
      <View style={{flex:1}}>
      <StatusBar backgroundColor={COLORS.gray}/>
      <MainNavigators />
      <FlashMessage position="bottom" />
      </View>
    </Provider>
  );
}
