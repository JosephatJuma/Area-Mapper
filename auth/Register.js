import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Header, BottomSheet, Chip, Dialog } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Register = ({ back, toHome }) => {
  const now = new Date();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [regDate, setRegDate] = useState(now);
  const [agree, setAgree] = useState(false);
  const [err, setErrMsg] = useState("");
  const [location, setlocation] = useState(null);
  const [showMethods, setShowMethods] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnTit, setButtonTit] = useState("Access this location");
  const consentToRegister = (consent) => {
    setAgree(consent);
    if (consent === true) {
      return;
    } else if (consent === false) {
      toHome();
    }
  };
  const selectMethod = () => {
    setShowMethods(!showMethods);
  };
  //Select image from upload
  const selectImage = async () => {
    setShowMethods(!showMethods);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Select from camera
  const takePhotoWithCamera = async () => {
    setShowMethods(!showMethods);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const submitForm = () => {
    setErrMsg("");
    if (!name) {
      setErrMsg("Name is required");
      return;
    }
    if (!image) {
      setErrMsg("Please select Image");
      return;
    }
    const regData = {
      name: name,
      image: image,
      location: location,
      registrationDate: regDate,
    };
    try {
      AsyncStorage.setItem("profile", JSON.stringify(regData));
      toHome();
    } catch (error) {
      Alert.alert("Error", "Failed, please try again");
    }
  };

  //Grant permission to access device location
  const getUserLocation = async () => {
    setLoading(true);
    let status = await Location.requestForegroundPermissionsAsync();
    if (status === "denied") {
      setErrMsg("Area Mapper was denied access to your location");
      setLoading(false);
      return;
    }
    let userLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 5000,
      timeout: 10000,
    });
    setlocation(userLocation.coords);
    if (userLocation) {
      setLoading(false);
    } else {
      setButtonTit("Retry");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <Header
        backgroundColor="#ff5349"
        leftComponent={
          <Ionicons name="arrow-back" size={30} color="#fff" onPress={back} />
        }
        centerComponent={
          <View
            style={{
              width: 250,
              alignContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              Respondent Registration
            </Text>
          </View>
        }
      />
      <Dialog
        overlayStyle={{
          backgroundColor: "#fff",
          height: 260,
          width: "97%",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 0,
          marginTop: 100,
        }}
        backdropStyle={{ backfaceVisibility: "#ff5349" }}
        isVisible={agree ? !location && true : false}
        statusBarTranslucent={true}
      >
        <Text style={styles.text}>Select this location</Text>
        {loading && <ActivityIndicator size={50} color="#ff5349" />}
        <Ionicons name="ios-location" size={50} color="#ff5349" />
        <Button
          onPress={getUserLocation}
          title={btnTit}
          containerStyle={[styles.btnContainer, { width: "100%" }]}
          buttonStyle={[styles.btn, { borderRadius: 0 }]}
          titleStyle={styles.btnTitle}
        />
      </Dialog>
      <View
        style={{
          backgroundColor: "#ff5349",
          width: "100%",
          alignItems: "center",
          height: 200,
          justifyContent: "center",
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
        }}
      >
        <TouchableOpacity
          onPress={selectMethod}
          style={[styles.boxShadow, styles.imagePicker]}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="folder-image"
              size={100}
              color="#ff5349"
            />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.cointerScrollStyle}
      >
        {err && (
          <Chip
            title={err}
            type="outline"
            containerStyle={{
              marginVertical: 15,
              width: "80%",
            }}
            icon={<FontAwesome name="times" color="red" size={20} />}
            titleStyle={{ color: "red" }}
            buttonStyle={{ borderColor: "red" }}
          />
        )}
        <Input
          placeholder="Full Name"
          inputContainerStyle={styles.inputContainer}
          containerStyle={[styles.inputContainerStyle, styles.boxShadow]}
          value={name}
          onChangeText={setName}
          leftIcon={<FontAwesome name="user" size={24} color="#ff5349" />}
          inputStyle={styles.input}
        />

        <Button
          title="A'm ready"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={submitForm}
        />
      </ScrollView>
      <BottomSheet
        isVisible={!agree}
        containerStyle={{ backgroundColor: "#ff5349c0" }}
      >
        <Chip containerStyle={styles.chip} buttonStyle={styles.chipBtn}>
          <Text style={styles.text}>
            Do you consent to be registered on our program?
          </Text>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <Button
              title="Yes"
              containerStyle={styles.alertBtnContainer}
              buttonStyle={styles.alertBtn}
              onPress={() => consentToRegister(true)}
            />
            <Button
              title="No"
              containerStyle={styles.alertBtnContainer}
              buttonStyle={styles.alertBtn}
              onPress={() => consentToRegister(false)}
            />
          </View>
        </Chip>
      </BottomSheet>
      <BottomSheet
        isVisible={showMethods}
        onBackdropPress={selectMethod}
        containerStyle={{ backgroundColor: "#ff5349c0" }}
      >
        <Chip containerStyle={[styles.chip]} buttonStyle={styles.chipBtn}>
          <Text style={styles.text}> Uplaad profile image</Text>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <View>
              <TouchableOpacity
                style={styles.select}
                onPress={takePhotoWithCamera}
              >
                <Ionicons name="camera" size={40} color="#ff5349" />
              </TouchableOpacity>
              <Text style={styles.text}>Camera</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.select} onPress={selectImage}>
                <Ionicons name="md-image" size={40} color="#ff5349" />
              </TouchableOpacity>
              <Text style={styles.text}>Gallery</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.select} onPress={selectMethod}>
                <Ionicons name="md-close-circle" size={40} color="#ff5349" />
              </TouchableOpacity>
              <Text style={styles.text}>Cancel</Text>
            </View>
          </View>
        </Chip>
      </BottomSheet>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cointerScrollStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
  inputContainer: { borderBottomWidth: 0 },
  inputContainerStyle: {
    width: "98%",
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ff5349",
    margin: 20,
  },
  input: { color: "#ff5349", fontWeight: "600" },
  form: {
    width: "100%",
    padding: 5,
  },

  text: {
    color: "#13a1a8",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  btnContainer: { height: 50, width: "90%" },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ff5349",
    borderRadius: 10,
  },
  btnTitle: { fontWeight: "700", fontSize: 20 },
  imagePicker: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 0.5,
    margin: 10,
    borderColor: "#ff5349",
    backgroundColor: "#fff",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 7,
  },
  alertBtnContainer: {
    width: "50%",
    height: 55,
    borderRadius: 0,
  },
  alertBtn: {
    backgroundColor: "#ff5349",
    borderRadius: 0,
    height: "100%",
    margin: 2,
  },
  chip: {
    backgroundColor: "#fff",
    minHeight: 250,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 0,
  },
  chipBtn: {
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignSelf: "center",
    borderRadius: 0,
    width: "100%",
  },
  select: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 100,
    margin: 15,
    borderWidth: 0.5,
    borderColor: "#ff5349",
  },
});
