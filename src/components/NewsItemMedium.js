
import React, { useEffect, useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import xpsetting from "../xpsetting";
import SocialBar from "../components/NewsSocialBar";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import * as WebBrowser from 'expo-web-browser';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import moment from "moment";

import * as RootNavigation from "../RootNavigation";


const isWeb = (Platform.OS === 'web')?true:false;



//import Webview from "react-native-web-webview";

const NewsItemMedium = ({
  news,
  showSocial = true,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    if (news.social_events){
      const lastFaceEvent=Object.keys(news.social_events.faces).length?news.social_events.faces[Object.keys(news.social_events.faces).pop()]:new Object({at:0});
      const lastCommentEvent=Object.keys(news.social_events.comments).length?news.social_events.comments[Object.keys(news.social_events.comments).pop()]:new Object({at:0});
      setLastEvent(lastFaceEvent.at>lastCommentEvent.at?lastFaceEvent:lastCommentEvent);
    }
  }, []);  

  const lanscape = () => {
    return (windowWidth>windowHeight);
  }

  const openNews = () => {
    lanscape()?
      WebBrowser.openBrowserAsync(news.site_link):
      RootNavigation.navigate("News Detail",{news: news})
  }
  

  return (
    <View contentContainerStyle={styles.container}>

      <View style={styles.content}>
        <Text style={styles.domain}>{news.domain} · {moment(news.postdate).fromNow()} </Text>
        {(lastEvent&&showSocial)&&(
          <Text style={styles.title}>{lastEvent.user_name} showed {lastEvent.face}  {moment(lastEvent.at).fromNow()} </Text>
        )}
        <View style={{flexDirection: "row"}}>
          <Pressable onPress={() => openNews()} >  
            {!lanscape() && (
              <Text style={styles.title}>{news.title} </Text>
            )}
            {news.image ? (
              <Image
                source={{ uri: news.image }}
                resizeMode='cover'
                style={{width: lanscape()?windowWidth/2:windowWidth, height: windowHeight/3}}
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : null}
          </Pressable>
          {lanscape() && (
          <View style={{width: windowWidth/2}}>
              {news.description &&(
                <>
                <Pressable onPress={() => openNews()} > 
                <Text style={styles.title}>{news.title} </Text>
                <Text style={styles.description}>{news.description}</Text>
                </Pressable>
                <SocialBar current_news={news} />

                </>
              )} 
          </View>
          )}
        </View>
      </View>
      {(!lanscape())&&
        <SocialBar current_news={news} />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: windowWidth,
    flexDirection: "column",
    alignSelf: "center",
    alignItems: 'center',

    //margin: 10,
  },


  content: {
    flex: 1,
    //backgroundColor: "gray"
  },
  title: {
    fontWeight: "bold",
    color: xpsetting.brand_color,
    margin: 5,
  },
  description: {
    margin: 5,
    //fontSize: 12,
  },
  domain: {
    color: "darkgrey",
    marginLeft: 5,
  },
  social: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  text: { marginBottom: 10 },

});
export default NewsItemMedium;
