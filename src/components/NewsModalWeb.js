///componente spostato dal dettaglio ma non testato
// ingaggio : <TouchableOpacity onPress={() => (isWeb)?(setModalVisible(!modalVisible)):(RootNavigation.navigate("News Detail",{news: news}))} >  

import React, { useCallback, useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import xpsetting from "../xpsetting";

import { Image } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";

import WebviewNative from "react-native-webview";
import WebviewWeb from "react-native-web-webview";

const isWeb = (Platform.OS === 'web')?true:false;
const Webview = (isWeb)?WebviewWeb:WebviewNative;


const NewsItemMedium = ({
    news,
    user,
    showDescription,
    showSocial =true,
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
          setModalVisible(!modalVisible);
      }}
      >        
    <SafeAreaView style={styles.centeredView}>
    <View style={styles.modalView}>
        <View style={styles.modalHeader}>
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
        >
            <Image
                source={xpsetting.app_close_logo}
                resizeMode='stretch'
                //style={styles.logoimage}
            />
            </Pressable>
        </View>
        <Webview
                source={{
                uri: news.site_link,
                //method: 'POST'
                }}
                style={{ width: wp('80%') }}
                //newWindow={true}
        >

        </Webview>

    </View>
    </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({


  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalHeader: {
    //margin: 10,
    alignSelf: "stretch",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
    //alignItems: 'stretch',
  },
  content: {
    flex: 1,
  },
  
});
export default NewsItemMedium;
