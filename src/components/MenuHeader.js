import React, { useContext } from "react";

import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text } from "react-native";
import { Context as NewsContext } from "../context/NewsContext";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import xpsetting from "../xpsetting";
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const MenuHeader = ({title, user}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <Image
            source={xpsetting.app_logo}
            resizeMode='contain'
            style={{ height: 38, width: 100 }}
            //style={styles.logoimage}
        />
        <View style={{flex:1, alignItems: "center"}}>
          <Text style={styles.title}>{title}</Text>
        </View>
    </View>


  </View>
  );
};
const styles = StyleSheet.create({
  header: {
    //flex: 1,
    margin: 0,
    //marginRight:5,
    height: 40,
    width: wp("100%"),
    //backgroundColor:"yellow",
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    marginLeft:5,
    fontWeight: 'bold',
    color: xpsetting.brand_color,
    fontSize: 18,
    //
  },
});



export default MenuHeader;
