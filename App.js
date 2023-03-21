import React from "react";
import GetStarted from "./Components/GetStarted";
import Home from "./Components/Home";
import Register from "./auth/Register";
import { enableLatestRenderer } from "react-native-maps";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
export default function App() {
  const getStaretedScreen = () => {
    const nav = useNavigation();
    const toHome = () => {
      return nav.navigate("Home");
    };
    const toReg = () => {
      return nav.navigate("Register");
    };
    return <GetStarted toReg={toReg} toHome={toHome} />;
  };
  const HomeScreen = () => {
    const nav = useNavigation();
    return <Home />;
  };
  const registerScreen = () => {
    const nav = useNavigation();
    return (
      <Register back={() => nav.goBack()} toHome={() => nav.navigate("Home")} />
    );
  };
  const Stack = createStackNavigator();
  enableLatestRenderer();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Get started" component={getStaretedScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Register"
          component={registerScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
