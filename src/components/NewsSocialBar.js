import React, { useContext, useState, useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Context as NewsContext } from "../context/NewsContext";
import xpsetting from "../xpsetting";
import { Image } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { Fontisto, AntDesign, MaterialIcons } from "@expo/vector-icons";
import xpApi from "../api/xpApi";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";


import WebviewNative from "react-native-webview";
import WebviewWeb from "react-native-web-webview";

const isWeb = (Platform.OS === 'web')?true:false;
const Webview = (isWeb)?WebviewWeb:WebviewNative;


const SocialBar = ({
    current_news, 
  }) => {
    const navigation = useNavigation();
    const [addComment, setAddComment] = React.useState(false);
    const [modalLayout, setModalLayout] = React.useState({});
    const [faceModalVisible, setFaceModalVisible] = useState(false);
    const [news, setNews] = useState(null);
    const { state } = useContext(NewsContext);
    const socialbarMenuRef = React.useRef();
    const faces = xpsetting.faces;
    
    useEffect(() => {
      setNews(current_news);
    }, []);  

    const updateFace = (key) => {
      const updated=news;
      const objEvent={user_id:state.user.id, user_name:state.user.name, news_id:updated.id , face: key, at: Date.now()};
      //salvo sul server l'evento
      xpApi.post("/addSocialEvent",{ id:news.id, type:"faces", data:objEvent })
      .then((response) => {
        console.log("response from ad social event " +response.data.face_counter);
        //aggiorno la news per far rinfrescare la visualizzazione sulla pagina
        updated.face_counter=response.data.face_counter;
        updated.updated_at=Date.now();
        setNews(updated);
        setFaceModalVisible(false);
        console.log("update counter by " + state.user.email + " " + JSON.stringify(news.face_counter) )
      });

    };

    const onShare = async () => {
      try {
        console.log("onShare function");
        const shareOpt=Platform.OS === "android" ? ( {    
          message: current_news.site_link,

        }):({
          title: "myfaces.news - " + current_news.title,  
          url: current_news.site_link,
        })
        console.log(shareOpt);
        const result = await Share.share(shareOpt);
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
            console.log("shared with activity type of :" + result.activityType);
          } else {
            // shared
            console.log("shared");
          }
        } else if (result.action === Share.dismissedAction) {
          console.log("dismiss");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <>
      <View style={styles.socialbar}>
        {news&&news.face_counter?(
          <>
          {Object.keys(news.face_counter).map((key) => { 
            return (
              <View key={key} style={styles.facebox} >
                <Image
                    source={faces[key].img}
                    resizeMode='contain'
                    style={{width: 15, height: 15,}}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                <Text style={styles.socialtext}> {news.face_counter[key]?news.face_counter[key].count:"0"}</Text>

              </View>
          )})}
          </>
        ):(null)}
      <View style={{ flex:1 }}></View>
      <View style={styles.socialboxComment} >
        <TouchableOpacity onPress={() => setAddComment(!addComment) }>  
          <Text style={styles.socialtext}>0 Comments</Text>
        </TouchableOpacity>  
      </View>
    </View>


    <View style={styles.socialbarMenu}
      ref={socialbarMenuRef}
      >
        <TouchableOpacity style={styles.facebox} onPress={() => {
              socialbarMenuRef.current.measureInWindow((left, top, width, height) => {
                setModalLayout({ left, top, width, height })}); 
              setFaceModalVisible(!faceModalVisible);
            } }>  
          <Text style={styles.socialtext}>Your face </Text>
          <Fontisto name={"smiley"} size={16} color={xpsetting.brand_color} />
        </TouchableOpacity> 
        <TouchableOpacity style={styles.facebox} onPress={() => Alert.alert("Comments are under development\n\nCooming Soon") }>  
          <Text style={styles.socialtext}>Comment </Text>
          <Fontisto name="comments" size={16} color={xpsetting.brand_color} />
        </TouchableOpacity> 
        <TouchableOpacity style={styles.facebox} onPress={() => onShare() }>  
          <Text style={styles.socialtext}>Share </Text>
          <Fontisto name="share-a"  color={xpsetting.brand_color} />
        </TouchableOpacity> 
    </View>
    
    <Modal
      animationType='fade'
      transparent={true}
      visible={faceModalVisible}
      supportedOrientations = {['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      onRequestClose={() => {
        setFaceModalVisible(false);
      }}
      >
      <TouchableWithoutFeedback onPress={() => setFaceModalVisible(false)}>
      <View style={styles.faceModalMainContainer}>
      <View style={[styles.faceModalContainer, {width: modalLayout.width, marginTop: modalLayout.top,}]}>
        <View style={styles.pickFacelbox}>
          <View style={{flex:1, flexDirection: "row"}} >
            {Object.keys(faces).map((key) => {  
              return (
              <View key={key}>
                <TouchableOpacity onPress={() => updateFace(key) }>  
                <View  style={{ alignItems: "center", width: 63} } >
                  <Image
                      source={faces[key].img}
                      resizeMode='contain'
                      style={{width: 30, height: 30}}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text style={{color: xpsetting.brand_color,fontSize: 12}}>{key}</Text>
                </View>
                </TouchableOpacity>  
              </View>
            )})
            }
          </View>
        </View>
      </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>  


    </>
    )
  }

  const styles = StyleSheet.create({
    socialbar: {
      flexDirection: "row",
      justifyContent: "flex-start",
      //backgroundColor: "gray",
      marginLeft: 5,
      marginRight: 5,
    },
    socialbarMenu: {
      flexDirection: "row",
      justifyContent: "space-around",
      //backgroundColor: "lightgray",
      marginLeft: 5,
      marginRight: 5,
    },    
    facebox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
    },
    socialboxComment: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      //alignContent: "flex-end",
      margin: 5,
    },
    socialtext: {
      color: xpsetting.brand_color,
      fontSize: 15,
    },
    faceimage: {
      width: 15 ,
      height: 15,
    },

    faceModalMainContainer:{
      flex:1,
    },

    faceModalContainer: {
      //flex: 1,
      // height --> impostato dinamicamente
      // marginTop --> impostato dinamicamente
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 10,
      height: 70,
      alignSelf: "center", 
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    pickFacelbox: {
      //flex:1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      margin: 5,
    },

  });

  export default SocialBar;