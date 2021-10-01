import React from "react";
import {Platform, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { navigationRef, isReadyRef } from './src/RootNavigation';
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as NewsProvider } from "./src/context/NewsContext";
import {FxAuthStack, FxTabs} from "./src/navigation/AppNavigation";
import xpsetting from "./src/xpsetting";

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //background: '#FBFBFB',
    background: '#FFFFFF',
  },
};


const ElementTheme = {
  Button: {
    titleStyle: {
      //color: 'red',
    },
    buttonStyle: {
      backgroundColor: xpsetting.brand_color,
    },
    containerStyle: [{
      //marginTop: 12,
      borderRadius: 10,
      //width: "40%"
   }],
  },
};


export default function App() {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);

  return (
    <NewsProvider>
      <AuthProvider>
        <NavigationContainer
            theme={NavigationTheme}
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}
          >
            <ThemeProvider theme={ElementTheme}>
                 <FxAuthStack/>              
            </ThemeProvider>
        </NavigationContainer>
      </AuthProvider>
    </NewsProvider>
  );
}


