import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import xpsetting from "../xpsetting";

//import https from "https";


const instance = axios.create({
  baseURL: xpsetting.srvURL,

});


instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    //config.httpsAgent.rejectUnauthorized=false;
    config.headers.post['xpapp'] = xpsetting.xpapp;
    if (user) {
      config.headers.post['xpuser'] = user;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
