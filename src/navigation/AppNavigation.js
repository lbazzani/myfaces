import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import AuthScreen from "../screens/AuthScreen";
import NewsScreen from "../screens/NewsScreen";
import SocialEventsScreen from "../screens/SocialEventsScreen";
import AddNewsScreen from "../screens/AddNewsScreen";
import NewsSearchScreen from "../screens/NewsSearchScreen";
import NewsDetail from "../screens/NewsDetail"
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context as AuthContext } from "../context/AuthContext";
import xpsetting from "../xpsetting";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/* tentativo di mettere il navigatore in alto per Android, la pulsantiera non ha le icone e si vede sull'header
const isAndroid = (Platform.OS === 'android')?true:false;
const createTabNavigator = (isAndroid)?createMaterialTopTabNavigator:createBottomTabNavigator;
*/
const createTabNavigator = createBottomTabNavigator;



export const fxAuthStack = createStackNavigator();
export function FxAuthStack() {
  const { state } = useContext(AuthContext);
  return (
    <fxAuthStack.Navigator
      initialRouteName="Auth"
      screenOptions={{ gestureEnabled: false }}
    >
    {!state.token?(
      <>
      <fxAuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false}}
      />
      <fxAuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false}}
      />
      </>
    ):(
      <>
      <fxAuthStack.Screen
        name="FxTabs"
        component={FxTabs}
        options={{ headerShown: false}}
      />
      </>
    )}
    </fxAuthStack.Navigator>
  )
}

export const fxTab = createTabNavigator();
export function FxTabs() {
  return (
    <fxTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Latest News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Find News') {
            iconName = focused ? 'ios-search-outline' : 'search-outline';
          }else if (route.name === 'Add News') {
            iconName = focused ? 'ios-add-circle-sharp' : 'ios-add-circle-outline';
          }else if (route.name === 'Social') {
            iconName = focused ? 'ios-heart-sharp' : 'ios-heart-outline';
          }else if (route.name === 'My Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: xpsetting.brand_color,
        inactiveTintColor: 'gray',
      }}
      >
      <fxTab.Screen name="Latest News" component={FxNewsStack} />
      <fxTab.Screen name="Find News" component={FxNewsSearchStack} />
      <fxTab.Screen name="Add News" component={FxNewsAddStack} />
      <fxTab.Screen name="Social" component={FxSocialStack} />
      <fxTab.Screen name="My Profile" component={FxProfileStack} />
    </fxTab.Navigator>
  );
}

export const fxProfileStack = createStackNavigator();
export function FxProfileStack() {
  return (
    <fxProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ gestureEnabled: false }}
    >
      <fxProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false}}
      />
      <fxProfileStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false}}
      />
    </fxProfileStack.Navigator>
  )
}



export const fxNewsStack = createStackNavigator();
export function FxNewsStack() {
  return (
    <fxNewsStack.Navigator
      initialRouteName="myFaces.news"
      screenOptions={{ gestureEnabled: false }}
    >
      <fxNewsStack.Screen
        name="myFaces.news"
        component={NewsScreen}
        options={{ headerShown: false}}
      />
      <fxNewsStack.Screen
        name="News Detail"
        component={NewsDetail}
        options={{ headerShown: true}}
      />
    </fxNewsStack.Navigator>
  );
}

export const fxNewsSearchStack = createStackNavigator();
export function FxNewsSearchStack() {
  return (
    <fxNewsSearchStack.Navigator
      initialRouteName="myFaces.news"
      screenOptions={{ gestureEnabled: false }}
    >
      <fxNewsSearchStack.Screen
        name="myFaces.news"
        component={NewsSearchScreen}
        options={{ headerShown: false}}
      />
      <fxNewsSearchStack.Screen
        name="News Detail"
        component={NewsDetail}
        options={{ headerShown: true}}
      />
    </fxNewsSearchStack.Navigator>
  );
}

export const fxNewAddStack = createStackNavigator();
export function FxNewsAddStack() {
  return (
    <fxNewAddStack.Navigator
      initialRouteName="myFaces.news"
      screenOptions={{ gestureEnabled: false }}
    >
      <fxNewAddStack.Screen
        name="myFaces.news"
        component={AddNewsScreen}
        options={{ headerShown: false}}
      />
      <fxNewAddStack.Screen
        name="News Detail"
        component={NewsDetail}
        options={{ headerShown: true}}
      />
    </fxNewAddStack.Navigator>
  );
}

export const fxSocialStack = createStackNavigator();
export function FxSocialStack() {
  return (
    <fxSocialStack.Navigator
      initialRouteName="myFaces.news"
      screenOptions={{ gestureEnabled: false }}
    >
      <fxSocialStack.Screen
        name="myFaces.news"
        component={SocialEventsScreen}
        options={{ headerShown: false}}
      />
      <fxSocialStack.Screen
        name="News Detail"
        component={NewsDetail}
        options={{ headerShown: true}}
      />
    </fxSocialStack.Navigator>
  );
}

