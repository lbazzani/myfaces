import React, { useEffect, useContext, useState } from "react";
import { Context as NewsContext } from "../context/NewsContext";
import SocialBar from "../components/NewsSocialBar";
import moment from "moment";
import { Image } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from "@expo/vector-icons";
import xpsetting from "../xpsetting";
import * as WebBrowser from 'expo-web-browser';
import xpApi from "../api/xpApi";


import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

//remidere Linking.openURL(news.site_link)


const NewsDetail = ({ route, navigation }) => {
  const { state } = useContext(NewsContext);
  const [testDetail, setTestDetail] = useState(false);
  const [news, setNews] = useState(route.params.news);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  
  useEffect(() => {
    xpApi.post("/NewsById",{ id:route.params.news.id })
      .then((response) => {
        setNews(response.data);
        console.log("request news by id " + route.params.news.id);
      });
  }, []);


  return (
    <ScrollView style={styles.content}>
      <Text style={styles.domain}>{news.domain} · {moment(news.postdate).fromNow()} </Text>
      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(news.site_link)} >  
        <Text style={styles.title}>{news.title} </Text>
        {news.image ? (
          <Image
          source={{ uri: news.image }}
          resizeMode='cover'
          style={{width: windowWidth, height: windowHeight/3}}
          PlaceholderContent={<ActivityIndicator />}
          transition={true}
          />
          ) : null}
        <Text style={styles.title}>Click on image to open the article</Text>
      </TouchableOpacity>

      {news.description? <Text style={styles.description}>{news.description}</Text> : null }
      

      
      <SocialBar current_news={news}/>

      {news.article_body? (
      <TouchableOpacity onPress={() => setTestDetail(testDetail?false:true)} >  
        <Text style={styles.title}>Detail for tester (Beta Tester Only)</Text>
      </TouchableOpacity>
      ):null}
      
      {testDetail ? (
        <View>
          <Text style={styles.description}>{news.id}</Text>
          <Text style={styles.description}>{news.article_body}</Text>
        </View>
      ):null}

    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    //alignSelf: "center",
    //alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    margin:5,
    color: xpsetting.brand_color,
    //backgroundColor: "gray",
    //margin: 10,
  },
  description: {
    margin: 5,
    //fontSize: 12,
  },
  domain: {
    color: "darkgrey",
    marginLeft:5,
  },

  text: {  },


});
export default NewsDetail;
