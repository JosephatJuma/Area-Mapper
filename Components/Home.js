import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button, BottomSheet, Chip, Header } from "@rneui/base";
const Home = ({ toReg }) => {
  const [userData, setUserData] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const showingMap = () => {
    setShowMap(!showMap);
  };
  const getData = async () => {
    if (userData === null) {
      try {
        const result = await AsyncStorage.getItem("profile");
        if (result !== null) {
          const data = JSON.parse(result);
          setUserData(data);
        } else {
          console.log("No data found!");
        }
      } catch (error) {
        console.log("Error retrieving data: ", error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [userData]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <Header
        backgroundColor="#ff5349"
        centerComponent={
          <View>
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}>
              Hi <Entypo name="hand" size={24} color="#fff" />
            </Text>
            <Text style={styles.appName}>
              {userData !== null && userData.name}
            </Text>
          </View>
        }
      />
      <View
        style={{ width: "100%", alignContent: "center", alignItems: "center" }}
      >
        {userData !== null && (
          <Image
            source={{ uri: userData.image }}
            style={[
              {
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#ff5349",
              },
            ]}
          />
        )}

        <View style={[styles.options]}>
          <TouchableOpacity
            style={{ alignContent: "center", alignItems: "center" }}
            onPress={showingMap}
          >
            <Ionicons name="ios-add-circle" size={80} color="#ff5349" />
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#ff5349" }}>
              Start mapping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        isVisible={showMap}
        onBackdropPress={showingMap}
        containerStyle={{ width: "100%", backgroundColor: "red" }}
      >
        <Chip containerStyle={[styles.chip]} buttonStyle={styles.chipBtn}>
          <MapView
            style={{ width: "110%", height: "80%" }}
            provider={PROVIDER_GOOGLE}
            region={
              userData && {
                latitude: userData.location.latitude,
                longitude: userData.location.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
            }
          />
          <Ionicons
            name="arrow-back-circle"
            size={50}
            color="#ff5349"
            onPress={showingMap}
            style={{ position: "relative", top: "-90%", left: "-42%" }}
          />
        </Chip>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    width: "100%",
  },
  appName: { color: "#fff", fontWeight: "900", fontSize: 28 },
  area: {
    width: "95%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#778899",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  btnContainer: { height: 55, width: "90%" },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ff5349",
    borderRadius: 100,
  },
  btnTitle: { fontWeight: "700", fontSize: 20 },
  boxshadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 7,
  },
  options: {
    backgroundColor: "#F5F5F5",
    width: "96%",
    height: 350,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderWidth: 0,
    borderColor: "lightgrey",
    justifyContent: "space-evenly",
  },
  option: {
    width: "100%",
    borderBottomWidth: 1,
    height: 80,
    borderColor: "lightgrey",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    backgroundColor: "#fff",
    minHeight: 800,

    width: "100%",
    borderRadius: 0,
    padding: 0,
    justifyContent: "space-evenly",
  },
  chipBtn: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignSelf: "center",
    borderRadius: 0,
    width: "100%",
  },
});
