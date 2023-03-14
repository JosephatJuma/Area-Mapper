import { StyleSheet, Text, View } from "react-native";
import GetStarted from "./Components/GetStarted";
import Home from "./Components/Home";
import Register from "./auth/Register";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
export default function App() {
  const getStaretedScreen = () => {
    const nav = useNavigation();
    return <GetStarted toConset={() => nav.navigate("Home")} />;
  };
  const HomeScreen = () => {
    const nav = useNavigation();
    return <Home toReg={() => nav.navigate("Register")} />;
  };
  const registerScreen = () => {
    return <Register />;
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.screenOptions}>
        <Stack.Screen name="Get started" component={getStaretedScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenOptions: {
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  },
});
