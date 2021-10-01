import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform, Alert} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Text, Button, Input, Image, Avatar } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Context as AuthContext } from "../context/AuthContext";
import { Formik } from 'formik';
import xpsetting from "../xpsetting";
import * as RootNavigation from "../RootNavigation";
//import RNFS from 'react-native-fs';



const ProfileScreen = ({ navigation }) => {
  const { state, signout, uploadAvatar} = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleClose = () => {
    console.log("close");
    if(image){
      uploadAvatar(image);
    }
    RootNavigation.navigate("Xpilon Home");
  }
  
  let userName = "";
  let userEmail = "";
  userName = state.user.name; 
  userEmail = state.user.email;
  console.log("user: " + userName);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }

    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });
    console.log(result.uri);
    if (!result.cancelled) {
      setImage(result.uri);

      if(Platform.OS === 'web'){
        uploadAvatar(result.uri);
      }else{
        //console.log("----"+result.base64);
       // const filePath = Platform.OS === 'android' && resizedImageUri.uri.replace
        //? resizedImageUri.uri.replace('file:/data', '/data')
        //: resizedImageUri.uri
        //const photoData = await RNFS.readFile(filePath.uri, 'base64');
        uploadAvatar(result.base64);
      }
    }
  };


  useFocusEffect(
    React.useCallback(() => {
        //console.log("Entro nel profilo, state.isSignin: " + state.isSignin)
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );  

  return (
    <View style={styles.container}>
      {xpsetting.xpapp === 'XP' ? (
      <View style={styles.header}>
        <TouchableOpacity style={styles.menucontent} onPress={handleClose}>
            <Image
              source={xpsetting.app_close_logo}
              resizeMode='contain'
              style={{    height: 30, width: 30 }}
              //style={styles.logoimage}
            />
        </TouchableOpacity>
      </View>
      ):(null)}

      <View style={styles.mainpage} >
        <View style={styles.logo}>
          <Image
                  source={xpsetting.app_logo}
                  resizeMode='contain'
                  style={styles.logoimage}
                />
        </View>


        <View style={styles.formAvatar}>
            <Avatar 
                rounded
                size="large"
                source={{uri: image?(image):(xpsetting.srvURL +"/avatar?file="+userName+'.jpg') }}
            />
            <TouchableOpacity style={styles.menucontent} onPress={pickImage}>
                <Text style={styles.pickMessage}>Pick an image for your profile</Text> 
            </TouchableOpacity>

        </View>

        <Formik style={styles.form}
          initialValues={{ 
              name: userName,
              email: userEmail
          }}
          onSubmit={async(values, {setSubmitting, setErrors, setStatus, resetForm}) => {
            try {
                await signout();
                //navigation.navigate("Signout");
                setStatus({success: true});
            } catch (error) {
                console.log(error);
                setStatus({success: false});
                setSubmitting(false);
                setErrors({submit: "API Error"});
            }
          }}
          >
          
          {({handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur}) => (
              <>
            <View>

              <Input
                placeholder="Email"
                value={values.email}
                editable={false}
              />

              <Input
                placeholder="Name"
                editable={false}
                value={values.name}
              />

              <Button style={styles.button}
                onPress={handleSubmit}
                title={"Sign Out"}
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </View>
        </>
        )}
        </Formik>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    height: 30,
    //margin: 10,
    alignSelf: "stretch",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
    //alignItems: 'stretch',
  },
  mainpage: {
    flex: 1,
    width: wp("70%"),
    height: hp("70%"),
    maxWidth: 360,
    alignSelf: "center",
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  from: {
  },
  formAvatar: {
    //width: wp("70%"),
    alignSelf: "stretch",
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  pickMessage: {
    //fontWeight: 'bold',
    color: xpsetting.brand_color,
    fontSize: 14,
    margin: 20
  },
  logo: {
    flexDirection: 'row',
    justifyContent: "center",
    //marginBottom: hp("10%"),
    //marginTop: hp("10%"),
  },
  logoimage: {
    height: hp("30%"),
    width: wp("70%"),
  },
  content: {
    width: wp("70%"),
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
    //alignItems: "center"
  },
  button: {
    margin: 20,
  },

});


export default ProfileScreen;
