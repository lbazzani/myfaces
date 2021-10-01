import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Button, Input } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import * as RootNavigation from "../RootNavigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      clearErrorMessage();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5
          style={{ alignSelf: "center" }}
          name="paw"
          size={24}
          color="#1DA1F2"
        />
      </View>
      <View>
        <Text style={styles.title}>Log in Xpilon</Text>
      </View>

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <View>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
        />
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="password"
        />
      </View>
      <View>
        <Button
          title="Log in"
          onPress={() => signin({ email, password })}
        />
      </View>
      <View>

        <TouchableOpacity onPress={() => RootNavigation.navigate("Signup")}>
          <Text style={styles.link}>"Don't have an account? Sign up instead"</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    margin: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  link: {
    color: "blue",
    margin: 20,
  },
});

export default SigninScreen;
