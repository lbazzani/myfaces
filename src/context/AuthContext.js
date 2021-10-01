import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import xpApi from "../api/xpApi";
import {Platform} from 'react-native';
import * as RootNavigation from "../RootNavigation";
import xpsetting from "../xpsetting";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload, isSignin: true, user: action.loginuser};
    case "local_signin":
        return { errorMessage: "", token: action.payload, isSignin: true, isLocalSignin: true, user: action.loginuser};
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "uploadAvatar":
      return { ...state, avatarUpdated: true };
    case "signout":
      return { ...state, token: null, errorMessage: "", isSignin: false, isLocalSignin: false};
    default:
      return state;
  }
};
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const user = await AsyncStorage.getItem("user");

  if (token) {
    var response=null;
    try {
      response = await xpApi.post("/tryLocalSignin", {user});
      dispatch({ type: "signin", payload: token, loginuser: JSON.parse(user)});
      //RootNavigation.navigate("FxTabs");
      console.log("Local Sign verified");

      RootNavigation.navigate("FxTabs")

    } catch (err) {
      if (err.response){
        console.log(err.response.status);
        console.log(err.response.data);

          RootNavigation.navigate("Signup")
      }
      else{
        console.log("API server not avaiable")
      }
    }
  } else {
    console.log("user not logged");

    RootNavigation.navigate("Signup")
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password, name }) => {
  try {
    const response = await xpApi.post("/signup", {
      email,
      password,
      name,
    });
    await AsyncStorage.setItem("token", response.data.token);
    const objUser={id: response.data.id, name: name, email: email};
    const theuser = JSON.stringify(objUser);
    await AsyncStorage.setItem("user", theuser);

    dispatch({ type: "signin", payload: response.data.token, loginuser: objUser, image: null });

  } catch (err) {
    if (err.response){
      dispatch({
        type: "add_error",
        payload: err.response.data.error
      });
    }
    else {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }

  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await xpApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));


    dispatch({ type: "signin", payload: response.data.token, loginuser: response.data.user});
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    console.log("signout end");
    dispatch({ type: "signout" });

  } catch (err) {
    console.log(err);
  }
};

const uploadAvatar = (dispatch) => async (file) => {
  try {
    //console.log(file);
    const image=file.replace(/^data:image\/\w+;base64,/, '');
    const dataToPost={image: image};
    const response = await xpApi.post("/uploadAvatar", dataToPost); //app.use(bodyParser.raw());
    //await AsyncStorage.setItem("avatarImage", file);
    dispatch({ type: "uploadAvatar"});
    console.log("updated........");
  } catch (err) {
    console.log(err);
  }
};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin, uploadAvatar },
  { token: null, user: null, isSignin: false, isLocalSignin: false, errorMessage: "", avatarUpdated: false }
);
