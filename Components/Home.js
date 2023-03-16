import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as turf from "@turf/turf";
import { Button, BottomSheet, Chip, Header, Dialog, Input } from "@rneui/base";
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [area, setArea] = useState(null);
  const [comment, setComment] = useState("");
  //Mark the map
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((previousMarkers) => [...previousMarkers, coordinate]);
  };

  const reset = () => setMarkers([]); //reset the mark poins
  const showingMap = () => setShowMap(!showMap); //show/hide map
  const showingArea = () => setShowArea(!showArea); //sho/hide the dialogue for results

  const getData = async () => {
    if (userData === null) {
      try {
        const result = await AsyncStorage.getItem("profile");
        if (result !== null) {
          const data = JSON.parse(result);

          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        return;
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //Compute Area when the points are 3 or more
  useEffect(() => {
    if (markers.length >= 3) {
      let array = markers.map((obj) => Object.values(obj));
      let lastValue = array[0]; // last value = first value to close the polygon
      array.push(lastValue);
      var polygon = turf.polygon([array]);
      const areaInSquareMeters = turf.area(polygon);
      setArea(areaInSquareMeters);
    }
  }, [markers]);

  //submit area results of the computation
  const submitResult = () => {
    const result = {
      id: Math.floor(Math.random() * 90000) + 10000,
      comment: comment,
      coordinates: markers,
      area: area,
    };
    try {
      AsyncStorage.setItem("profile", JSON.stringify(result));
      Alert.alert("Succeeded", "Data stored successfully!");
      showingArea();
      setComment("");
      setArea(null);
      setMarkers([]);
    } catch (error) {
      Alert.alert("Failed", "Error storing data, try again");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <Header
        backgroundColor="#ff5349"
        containerStyle={{ height: 300 }}
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
        <Dialog
          isVisible={showArea}
          overlayStyle={styles.dialoge}
          onBackdropPress={showingArea}
          backdropStyle={{ backgroundColor: "#000000c0" }}
        >
          <Feather
            name="delete"
            size={30}
            color="#13a1a8"
            style={{ alignSelf: "flex-end" }}
            onPress={showingArea}
          />
          <View style={styles.inputCont}>
            <Text style={styles.text}>
              Area: {area !== null && area.toFixed(2)} square meters
            </Text>
          </View>
          <Input
            placeholder="Add comment (Optional)"
            containerStyle={styles.inputCont}
            style={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            multiline={true}
            value={comment}
            onChangeText={setComment}
          />
          <Button
            onPress={submitResult}
            containerStyle={{ height: 50 }}
            buttonStyle={styles.btn}
            title="Save"
          />
        </Dialog>
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
            style={{ width: "110%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            onPress={handleMapPress}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={
              userData && userData.location
                ? {
                    latitude: userData.location.latitude,
                    longitude: userData.location.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }
                : {
                    latitude: 0.3476,
                    longitude: 32.5825,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }
            }
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                style={{ backfaceVisibility: "yellow" }}
              />
            ))}
            <Polyline
              coordinates={markers}
              strokeColor="#ff5349"
              strokeWidth={1}
            />
          </MapView>
          {markers.length >= 3 && (
            <View
              style={{
                position: "relative",
                top: "-40%",
                left: "0%",
                width: "100%",
                height: 50,
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Button
                onPress={showingArea}
                title="Compute area"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
              />
              <Button
                onPress={reset}
                title="Restart"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
              />
            </View>
          )}
          <Ionicons
            name="arrow-back-circle"
            size={60}
            color="#ff5349"
            onPress={showingMap}
            style={{ position: "relative", top: "-90%", left: "-42%" }}
          />
          <View></View>
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
    justifyContent: "space-evenly",
  },
  appName: { color: "#fff", fontWeight: "900", fontSize: 28 },

  text: {
    color: "#13a1a8",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },

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
    borderColor: "#13a1a8",
    justifyContent: "space-evenly",
  },
  option: {
    width: "100%",
    borderBottomWidth: 1,
    height: 80,
    borderColor: "#13a1a8",
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
  btnContainer: {
    width: "48%",
  },
  btn: { backgroundColor: "#ff5349", height: "100%" },
  inputCont: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    maxHeight: 200,
    marginBottom: 10,
    marginRight: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    minHeight: 50,
  },
  input: {
    color: "#13a1a8",
    fontSize: 18,
    fontWeight: "600",
  },
  dialoge: {
    backgroundColor: "#fff",
    width: "98%",
    minHeight: "40%",
    borderRadius: 30,
  },
});
