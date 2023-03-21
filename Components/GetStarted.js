import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image } from "@rneui/base";

const GetStarted = ({ toReg, toHome }) => {
  const [userData, setUserData] = useState(null);
  const getData = async () => {
    //await AsyncStorage.removeItem("profile");
    await AsyncStorage.getItem("profile").then((result) => {
      const data = JSON.parse(result);
      setUserData(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <Image
        source={require("../assets/images/getstarted.png")}
        style={styles.image}
      />
      <View style={styles.textArea}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.text}>
          Map the area of the compound using this app
        </Text>
      </View>
      <Button
        onPress={userData === null ? toReg : toHome}
        title="Get started"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
      />
    </View>
  );
};

export default GetStarted;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
  image: { width: 250, height: 250 },
  textArea: { alignContent: "center", alignItems: "center" },
  welcome: { color: "#ff5349", fontWeight: "bold", fontSize: 30 },
  text: {
    color: "#13a1a8",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  btnContainer: { height: 60, width: "90%" },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ff5349",
    borderRadius: 100,
  },
  btnTitle: { fontWeight: "700", fontSize: 20 },
});
