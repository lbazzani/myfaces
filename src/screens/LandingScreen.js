import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as RootNavigation from "../RootNavigation";
import xpsetting from "../xpsetting";
import { FontAwesome5 } from "@expo/vector-icons";

const LandingScreen = ({ navigation }) => {
  console.log("Landing Screen");
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
                source={xpsetting.app_landing_logo}
                resizeMode='contain'
                style={styles.image}
              />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Entra e scopri i nostri progetti
        </Text>
        <Button
          title="Crea un Account"
          onPress={() => navigation.navigate("Signup")}
        />


        <TouchableOpacity onPress={() => RootNavigation.navigate("Signin")}>
          <Text style={styles.link}>"Hai già un account? Log in"</Text>
        </TouchableOpacity>
 
      </View>
    </View>
  );
};

LandingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    //backgroundColor: '#FFFFFF',
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  image: {
    height: hp('40%'),
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    margin: 40,
  },
  text: {
    fontSize: 30,
    //fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  navlink: {
    marginTop: 20,
  },
  link: {
    color: "blue",
    margin: 20,
  },
});
export default LandingScreen;
