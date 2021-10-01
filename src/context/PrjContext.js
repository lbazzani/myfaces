import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import xpApi from "../api/xpApi";
const prjReducer = (state, action) => {
  switch (action.type) {
    case "fetch_prj":
      return { ...state, prj: action.payload };
    case "get_user":
        return { ...state, user: action.payload };
    case "reset":
      return { ...state, newPrj: {} };
    default:
      return state;
  }
};
const fetchPrj = (dispatch) => async () => {
  const response = await xpApi.post("/Prjs");
  dispatch({ type: "fetch_prj", payload: response.data });
  dispatch({ type: "get_user", payload: JSON.parse(await AsyncStorage.getItem("user")) });
};

const reset = (dispatch) => () => {
  dispatch({ type: "reset" });
};
export const { Context, Provider } = createDataContext(
  prjReducer,
  {
    fetchPrj,
    reset,
  },
  {prj: [], user: {}}
);
