import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
const Register = () => {
  const now = new Date();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [regDate, setRegDate] = useState(now);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const submitForm = () => {
    setRegDate(now);
    // console.log(regDate);
    // console.log(name);
    // console.log(image);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <Text style={styles.text}>
        Please Fill the form below with your details
      </Text>
      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.cointerScrollStyle}
      >
        <TouchableOpacity
          onPress={selectImage}
          style={[styles.boxShadow, styles.imagePicker]}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 110, borderRadius: 20 }}
            />
          ) : (
            <Text>Select Image</Text>
          )}
        </TouchableOpacity>
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
    height: 1000,
    marginTop: 100,
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
    color: "#778899",
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
  imagePicker: {
    height: 120,
    width: "45%",
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 10,
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
});
