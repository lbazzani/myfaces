import React, { useContext, useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity,FlatList, ActivityIndicator, Alert, Platform } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Text, Button, Input, Image } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuHeader from "../components/MenuHeader";
import SocialBar from "../components/NewsSocialBar";
import NewsItem from "../components/NewsItemSocial";
import { Context as NewsContext } from "../context/NewsContext";
import xpApi from "../api/xpApi";


import { Formik } from 'formik';
import * as Yup from 'yup';
import xpsetting from "../xpsetting";
import * as RootNavigation from "../RootNavigation";


const AddNewsScreen = ({ navigation }) => {
  const { state, fetchUser } = useContext(NewsContext);
  const [preview, setPreview] = useState(null);
  const [initialURL, setInitialURL] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [postedNews, setPostedNews] = useState(null);
  const flatListRef = React.useRef();

  useEffect(() => {
    fetchUser();
    fetchPosted();
    console.log("____news_ " + Date.now());
    //leggo i post dell'utente
  }, []); 


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("Add news focused");
      setPreview(null);
      setApiErrorMessage(null);
      setInitialURL("");

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );  
  
  const fetchPosted = () => {
    xpApi.post("/NewsByUser",{ user:{user_id:state.user.id, user_name:state.user.name} })
    .then((response) => {
      setPostedNews(JSON.parse(response.data.news));
    });
  }


  const ErrorMessage = ({ errorValue }) => (
    <View>
        <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  )

  const validationSchema = Yup.object().shape({
    url: Yup.string()
        .label('News link')
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?/,
          'Enter correct url! (es. https://newssite.com/newsarticle.html)'
        )
        .required('Please enter artilce link')
  })

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <MenuHeader title="Post a News" user={state.user} />
      
      <View style={styles.sectionSlider}>
          <Text style={styles.sectionTitle}>
              Publish a news from link
          </Text>
      </View>
      <View style={styles.mainpage} >
        <Formik 
          initialValues={{ 
              url: initialURL,
          }}
          onSubmit={async(values, {setSubmitting, setErrors, setStatus, resetForm}) => {
            try {
              if(!preview){
                const resp= await xpApi.post("/getNewsPreview",{ site_link:values.url, user:{user_id:state.user.id, user_name:state.user.name} });
                setPreview(resp.data);
              }else{
                await xpApi.post("/publishPost",{ site_link:values.url, user:{user_id:state.user.id, user_name:state.user.name} });
                Alert.alert("News Posted");
                fetchPosted();
                setPreview(null);
                setApiErrorMessage(null);
                setInitialURL("");
              }
              setStatus({success: true})
            } catch (error) {
              console.log(error);
              setStatus({success: false});
              setSubmitting(false);
              setApiErrorMessage("Site not supported, your post is under validation");
              setErrors({submit: "API Error"});
            }
          }}
          
          validationSchema={validationSchema}
        >
          
          {({handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur}) => (
              <>
            <View style={styles.form}>
              {!preview ? (
                <>
                <Input
                  placeholder="Paste news link here"
                  value={values.email}
                  onChangeText={handleChange('url')}
                  onBlur={handleBlur('url')}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {touched.url && errors.url ? (
                  <ErrorMessage errorValue={touched.url && errors.url} />
                ) : null}
                {apiErrorMessage ? (
                  <Text style={styles.errorText}>{apiErrorMessage}</Text>
                ) : null}
                </>
              ):null}


              {preview ? (
                <>
                <Text style={styles.title}>{preview.title} </Text>
                {preview.image ? (
                  <Image
                  source={{ uri: preview.image }}
                  resizeMode='cover'
                  style={styles.image}
                  PlaceholderContent={<ActivityIndicator />}
                  transition={true}
                  />
                  ) : null}
                {preview.description? <Text style={styles.description}>{preview.description}</Text> : null }
                <SocialBar current_news={preview}/>
                </>
              ):null}
              
              <Button style={styles.button}
                onPress={handleSubmit}
                title={!preview ? ("Preview"):("Post")}
                disabled={! isValid || isSubmitting}
                loading={ isSubmitting }
              />

            </View>
        </>
        )}
        </Formik>

      </View>

      {postedNews?(
        <View style={styles.sectionSlider}>
          <Text style={styles.sectionTitle}>
              Your recent post
          </Text>
        </View>
      ):(null)}

      <View style={styles.listcontainer}>
      <FlatList
        data={postedNews}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ref={flatListRef}
        ItemSeparatorComponent={() => (
            <View style={styles.separator}/>
          )
        }
        renderItem={({ item }) => {
          return (
              <NewsItem
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
    //margin: 10,
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
  mainpage: {
    //flex: 1,
    width: wp("100%"),
    //height: 200,
    //maxWidth: 360,
    //paddingTop:20,
    alignSelf: "center",
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  from: {
    
  },

  menutext: {
    fontWeight: 'bold',
    color: xpsetting.brand_color,
    fontSize: 20
  },
  title: {
    fontWeight: "bold",
    margin:5,
    color: xpsetting.brand_color,
    //backgroundColor: "gray",
    //margin: 10,
  },
  image: {
    alignSelf: 'center',
    width: wp('100%'),
    height: 200,
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  description: {
    margin: 5,
    //fontSize: 12,
  },
  errorText: {
    color: 'red',
    marginLeft: 10
  },  
  button: {
    margin: 5,
    width: 150,
    alignSelf: "center"
  },
  listcontainer :{
    ...Platform.select({
      web: {
        height: hp("70%"),
      },
      default: {
        flex: 50,
      }
    })
  },
  separator: {
    height: 3,
    width: "100%",
    backgroundColor: xpsetting.brand_color,
    opacity: 0.5,
    marginTop:2
  }

});



export default AddNewsScreen;
