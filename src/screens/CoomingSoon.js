import React, { useEffect, useContext } from "react";
import { Context as NewsContext } from "../context/NewsContext";
import { Context as AuthContext } from "../context/AuthContext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuHeader from "../components/MenuHeader";
import xpsetting from "../xpsetting";


import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  RefreshControl
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const isWeb = (Platform.OS === 'web')?true:false;

const CoomingSoon = ({ navigation }) => {


  useEffect(() => {
    console.log("____Cooming Soon_ " + Date.now());
  }, []);  


  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <MenuHeader title="Cooming Soon" />
      
      <View style={styles.sectionSlider}>
          <Text style={styles.sectionTitle}>
              Cooming Soon - We Are Working for You
          </Text>
      </View>

    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //marginTop: 50,
    //backgroundColor: '#FFFFFF',
  },
  sectionSlider: {
    height: 20,
    //backgroundColor: '#FFFFFF',
    justifyContent: "center",
    backgroundColor: xpsetting.brand_color,
    //marginTop: 80
  },

  sectionTitle: {
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 5,
    //
  },
  
  listcontainer :{
    ...Platform.select({
      web: {
        height: hp("80%"),
      },
      default: {
        flex: 50,
      }
    })
  },
  
  listcontitem :{

  },
  footer: {
    flex: 1,
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: "center",
    //backgroundColor: xpsetting.brand_color,
  },
  footertext: {
    fontSize: 12,
    marginLeft: 5,
  },

  separator: {
    height: 3,
    width: "100%",
    backgroundColor: xpsetting.brand_color,
    opacity: 0.5,
    marginTop:2
  }


});
export default CoomingSoon;
