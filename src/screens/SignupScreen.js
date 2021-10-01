import React, { useContext, useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Text, Button, Input, Image } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Context as AuthContext } from "../context/AuthContext";
import { Formik } from 'formik';
import * as Yup from 'yup';
import xpsetting from "../xpsetting";
import * as RootNavigation from "../RootNavigation";


const SignupScreen = ({ navigation }) => {
  const { state, signup, signin, clearErrorMessage } = useContext(AuthContext);
  const [signupVeiw, setSignupVeiw] = useState(true);

  const handleClose = () => {
    console.log("close");
    RootNavigation.navigate("Xpilon Home");
  }

  const switchView = () => {
    setSignupVeiw(!signupVeiw);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      clearErrorMessage();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );  

  const ErrorMessage = ({ errorValue }) => (
    <View>
        <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  )

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label('Name')
        .required('Please enter your name')
        .min(3, 'Name must have at least 3 characters ')
        .max(64, 'Name must have max 64 characters '),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter your email address'),
    password: Yup.string()
        .label('Password')
        .required('Please enter your password')
        .min(4, 'Password must have at least 4 characters ')
        .max(64, 'Password must have max 64 characters ')
})

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
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
        <Formik style={styles.form}
          initialValues={{ 
              name: '',
              email: '',
              password: ''
          }}
          onSubmit={async(values, {setSubmitting, setErrors, setStatus, resetForm}) => {
            try {
              signupVeiw ? (
                await signup(values)
              ):(
                await signin(values)
              )
              setStatus({success: true})
            } catch (error) {
              console.log(error);
              setStatus({success: false});
              setSubmitting(false);
              setErrors({submit: "API Error"});
            }
          }}
          
          validationSchema={signupVeiw ? (validationSchema) :(null)}>
          
          {({handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur}) => (
              <>
            <View>
              <Input
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <Input
                secureTextEntry
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              
              {signupVeiw ? (
              <Input
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoCapitalize="none"
                autoCorrect={false}
              />
              ) : (null)}
              {signupVeiw ? (
              <ErrorMessage errorValue={touched.name && errors.name} />
              ) : (null)}

              {state.errorMessage ? (
                <Text style={styles.errorText}>{state.errorMessage}</Text>
              ) : null}
              <Button style={styles.button}
                onPress={handleSubmit}
                title={
                  signupVeiw?("Sign up"):("Sign in")
                }
                disabled={! isValid || isSubmitting}
                loading={ isSubmitting }
              />

            </View>
        </>
        )}
        </Formik>
        {signupVeiw ? (
        <View>
          <Text style={styles.agreement}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use. Others will be able to find you by email or
            phone number when provided Privacy Options
          </Text>
        </View>
        ) : (null)}
        <View>
          <TouchableOpacity style={styles.switchView} onPress={switchView}>
            <Text style={styles.menutext}>
              {signupVeiw ? ("Do you have an Account?") : ("Dont' have an Account?")}
            </Text>
            {xpsetting.xpapp === 'XP' ? (
              <Image
                source={
                  signupVeiw? (require('../../app/assets/SigninIcon.png'))
                  : (require('../../app/assets/SignupIcon.png'))
                }
                resizeMode='contain'
                style={styles.menuicon}
              />
              ):(null)}   
            </TouchableOpacity>   
        </View>

      </View>

    </SafeAreaView>
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
  switchView: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  menutext: {
    fontWeight: 'bold',
    color: xpsetting.brand_color,
    fontSize: 20
  },
  menuicon: {
    height: 50,
    width: 50,
  },
  agreement: {
    fontSize: 8,
    margin: 20,
    color: "grey",
  },
  errorText: {
    color: 'red',
    marginLeft: 10
  },  
  button: {
    margin: 20,
  },
});



export default SignupScreen;
