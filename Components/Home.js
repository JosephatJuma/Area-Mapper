import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, BottomSheet, Chip } from "@rneui/base";
const Home = ({ toReg }) => {
  const [showConsentAlert, setShowConsentAlert] = useState(false);

  const alertUser = () => {
    setShowConsentAlert(!showConsentAlert);
  };
  const consentToRegister = (consent) => {
    alertUser();
    consent === true ? toReg() : console.log("No");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff5349" style="light" />
      <View style={styles.area}>
        <Button
          onPress={alertUser}
          title="Register "
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
        />
        <Text style={styles.text}>
          Already have an account? <Text>Sign in</Text>
        </Text>
      </View>
      <BottomSheet
        isVisible={showConsentAlert}
        onBackdropPress={alertUser}
        containerStyle={{ backgroundColor: "#000000c0" }}
      >
        <Chip
          containerStyle={{
            backgroundColor: "#fff",
            height: 200,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            height: "100%",
            flexDirection: "column",
          }}
        >
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    justifyContent: "space-evenly",
  },
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
});
