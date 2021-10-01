import React, { useEffect, useContext } from "react";
import { Context as NewsContext } from "../context/NewsContext";
import { Context as AuthContext } from "../context/AuthContext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ListItem } from 'react-native-elements'
import { Avatar } from "react-native-elements";
import NewsItem from "../components/NewsItemMedium";
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

const SocialEventsScreen = ({ navigation }) => {
  const { state, fetchSocialEvents, fetchUser } = useContext(NewsContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const flatListRef = React.useRef();

  useEffect(() => {
    fetchSocialEvents();
    fetchUser();
    console.log("____news_ " + Date.now());
  }, []);  

  

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchSocialEvents(); //true per refresh
    setRefreshing(false);
    flatListRef.current?flatListRef.current.scrollToOffset({ animated: true, offset: 0 }):null;
  }, [refreshing]);


  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <MenuHeader title="Latest Social Events" user={state.user} />
      
      <View style={styles.sectionSlider}>
          <Text style={styles.sectionTitle}>
              Latest Social Events
          </Text>
      </View>
    
      <View style={styles.listcontainer}>
        <FlatList
          data={state.socialEvents}
          keyExtractor={(item) => item.id.toString()}
          ref={flatListRef}
          ItemSeparatorComponent={() => (
              <View style={styles.separator}/>
            )
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

          onEndReached={({ distanceFromEnd }) => {
            console.log("....    onEndReached " + distanceFromEnd);
            if (distanceFromEnd < 0) return;
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            return (

                <NewsItem
                  news={item}
                  user={state.user}
                />
            );
          }}
        />
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
    flex: 1,
    flexGrow: 1,
  },
  
  listcontitem :{

  },


  separator: {
    height: 3,
    width: "100%",
    backgroundColor: xpsetting.brand_color,
    opacity: 0.5,
    marginTop:2
  }


});
export default SocialEventsScreen;
