
import React, { useEffect, useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import xpsetting from "../xpsetting";
import SocialBar from "./NewsSocialBar";
import { AntDesign } from "@expo/vector-icons";
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
} from "react-native";
import moment from "moment";

import * as RootNavigation from "../RootNavigation";


const isWeb = (Platform.OS === 'web')?true:false;



//import Webview from "react-native-web-webview";

const NewsItemSocial = ({
  news,
  showSocial =true,
}) => {
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    if (news.social_events){
      const lastFaceEvent=Object.keys(news.social_events.faces).length?news.social_events.faces[Object.keys(news.social_events.faces).pop()]:new Object({at:0});
      const lastCommentEvent=Object.keys(news.social_events.comments).length?news.social_events.comments[Object.keys(news.social_events.comments).pop()]:new Object({at:0});
      setLastEvent(lastFaceEvent.at>lastCommentEvent.at?lastFaceEvent:lastCommentEvent);
    }
  }, []);  

  return (
    <View contentContainerStyle={styles.container}>
      {lastEvent?(
      <Text style={styles.description}>{lastEvent.user_name} showed {lastEvent.face}  {moment(lastEvent.at).fromNow()} </Text>
      ):(null)}

      <Pressable onPress={() => RootNavigation.navigate("News Detail",{news: news})} >  
      <View style={styles.content}>
        {news.image ? (
          <Image
          source={{ uri: news.image }}
          resizeMode='cover'
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          />
          ) : null}
        <View styles={{flexDirection: "column"}}>
          <Text style={styles.domain}>{news.domain} · {moment(news.postdate).fromNow()} </Text>
          <Text style={styles.title}>{news.title} </Text>
        </View>
      </View>
      </Pressable>
      {showSocial?
        <SocialBar current_news={news} />
        : null
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: wp('100%'),
    //flexDirection: "column",
    //alignSelf: "center",
    //alignItems: 'center',
    //margin: 10,
  },


  content: {
    flex: 1,
    width: wp('100%'),
    flexDirection: "row",
    //backgroundColor: "gray"
  },
  title: {
    //fontWeight: "bold",
    width: wp("68%"),
    color: xpsetting.brand_color,
    margin: 2,
  },
  description: {
    fontWeight: "bold",
    color: xpsetting.brand_color,
    margin: 5,
    fontSize: 12,
  },
  domain: {
    color: "darkgrey",
    marginLeft: 2,
  },

  text: { marginBottom: 10 },
  image: {
      //alignSelf: 'center',
      width: wp('30%'),
      height: 70,
      borderWidth: 1,
      borderColor: "#FFFFFF"
      //marginTop: 0,
  },
});
export default NewsItemSocial;
