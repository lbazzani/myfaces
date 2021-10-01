import React, { useEffect, useContext } from "react";
import { Context as NewsContext } from "../context/NewsContext";
import { Context as AuthContext } from "../context/AuthContext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SearchBar, Button } from 'react-native-elements'
import { Avatar } from "react-native-elements";
import NewsItemMedium from "../components/NewsItemMedium";
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

const NewsScreen = ({ navigation }) => {
  const { state, fetchNewsSearch,clearNewsSearch, fetchUser } = useContext(NewsContext);
  const [isSearchSubmitting, setSearchSubmitting] = React.useState(false);
  const [searchString, setSearchString] = React.useState(null);
  const flatListRef = React.useRef();

  useEffect(() => {

    fetchUser();
    console.log("____Search_News_ " + Date.now());
  }, []);  

  const searchOnChangeText = (text) => {
    //text=text.trim();
    if (text && text.trim().length > 2) {
      setSearchString(text);
    } else {
      text.trim().length==0?setSearchString(null):setSearchString(text)
    }
  };

  const searchOnClear = () => {
    clearNewsSearch();
  };

  const searchOnSubmit = async () => {
    setSearchSubmitting(true);
    await fetchNewsSearch(searchString.trim());
    setSearchSubmitting(false);
    flatListRef.current?flatListRef.current.scrollToOffset({ animated: true, offset: 0 }):null;
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <MenuHeader title="Search in News Posted" user={state.user} />
      <View style={{backgroundColor:"lightgray"}}>
        <SearchBar round
          placeholder="Search"
          searchIcon={{ size: 24 }}
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            }}
          inputContainerStyle={{
            backgroundColor: 'white',
            //borderRadius: 8,
            //borderWidth: 1,
            //borderStyle: 'solid',
            }}
          //placeholderTextColor={'#g5g5g5'}
          style={{ height:30}}
          onChangeText={(text) => searchOnChangeText(text)}
          onClear={(text) => searchOnClear()}
          //onSubmitEditing={console.log("submitting ending")}
          //showLoading={true}
          value={searchString}
          placeholder={'Search'}
          editable={true}
        />
      </View>

      {searchString?(
        <View style={styles.searchBox}>
          <Text style={styles.searchTitle}>Search in news: {searchString}?</Text>
          <Text style={styles.searchExplain}>You can specify multiple words using the conditions And({'&'}) Or ({'|'}).</Text>
          <Button style={styles.button}
              onPress={() => searchOnSubmit()}
              title={"Search"}
              disabled={isSearchSubmitting}
              loading={isSearchSubmitting}
          />
        </View>
      ):(null)}

    
      <View style={styles.listcontainer}>
        <FlatList
          data={state.newsSearchReult}
          keyExtractor={(item) => item.id.toString()}
          ref={flatListRef}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => (
              <View style={styles.separator}/>
            )
          }
          renderItem={({ item }) => {
            return (
                <NewsItemMedium
                  style={styles.listitem}
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
    justifyContent: 'flex-start'
    //marginTop: 50,
    //backgroundColor: '#FFFFFF',
  },


  listcontainer :{
    ...Platform.select({
      web: {
        height: hp("80%"),
      },
      default: {
        flex: 6,
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
  },
  // for search box 
  searchBox: {
    flex: 1,
    margin: 0,
    //marginRight:5,
    //height: 40,
    backgroundColor:"lightgray",
    alignItems: 'center',
  },
  searchTitle: {
    marginLeft:5,
    fontWeight: 'bold',
    color: xpsetting.brand_color,
    fontSize: 18,
    alignSelf: "flex-start",
    //
  },
  searchExplain: {
    //fontWeight: 'bold',
    marginLeft: 5,
    color: xpsetting.brand_color,
    fontSize: 10,
    alignSelf: "flex-start",

  },
  button: {
    margin: 10,
    //alignSelf: "center",
  }
});
export default NewsScreen;
