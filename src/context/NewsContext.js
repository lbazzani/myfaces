import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import xpApi from "../api/xpApi";
const newsReducer = (state, action) => {
  switch (action.type) {
    case "fetch_news":
      return { ...state, news: action.payload , currentPage: action.currentPage};
    case "fetch_social_events":
        return { ...state, socialEvents: action.payload};
    case "fetch_news_search":
        return { ...state, newsSearchReult: action.payload , currentPage: action.currentPage, searchString:action.searchString};
    case "clear_news_search":
      return { ...state, newsSearchReult: null, searchString:null};
    case "fetch_user":
        return { ...state, user: action.payload };
    default:
      return state;
  }
};
const fetchNews = (dispatch) => async (page) => {
  const response = await xpApi.post("/News", { page: !page?0:page });
  dispatch({ type: "fetch_news", payload: JSON.parse(response.data.news), currentPage: response.data.page });
};

const fetchSocialEvents = (dispatch) => async () => {
  const response = await xpApi.post("/GetLastSocialEvents");
  dispatch({ type: "fetch_social_events", payload: JSON.parse(response.data.news) });
};

const fetchNewsSearch = (dispatch) => async (searchString) => {
  console.log("news search: "+ searchString);
  const response = await xpApi.post("/SearchNews", { searchString: !searchString?"":searchString });
  dispatch({ type: "fetch_news_search", payload: JSON.parse(response.data.news), currentPage: response.data.page, searchString: searchString });
};

const clearNewsSearch = (dispatch) => async (searchString) => {
  console.log("clear news search: ");
  dispatch({ type: "clear_news_search"});
};

const fetchUser = (dispatch) => async () => {
  const userstr = await AsyncStorage.getItem("user");
  const userobj=JSON.parse(userstr);
  dispatch({ type: "fetch_user", payload: userobj });
};


export const { Context, Provider } = createDataContext(
  newsReducer,
  {
    fetchNews,
    fetchUser,
    fetchSocialEvents,
    fetchNewsSearch,
    clearNewsSearch,
  },
  {news: [], newsSearchReult: [], socialEvents: [], currentPage:0, searchString:null, user: {}}
);
