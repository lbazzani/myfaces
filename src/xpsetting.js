export default {
    srvURL:"https://xpapi.xpilon.com/api",
    //srvURL:"https://xpapi.xpilon.com/dev",
    //srvURL:"http:////localhost:3000",

    /*      
    xpapp:"XP",
    app_landing_logo: require('../app/assets/xpilon_home.jpg'),
    app_landing_animation: require('../app/assets/AnimazioneXpilon.gif'),
    app_logo: require('../app/assets/xpilon_logo.png'),
    app_close_logo: require('../app/assets/close.png'),
    brand_color: "#F15A24",
    
   */
  
    xpapp:"FX",
    app_landing_logo: require('../app/assets/MyFace_logo.png'),
    app_landing_animation: require('../app/assets/AnimazioneXpilon.gif'),
    app_logo: require('../app/assets/MyFace_logo.png'),
    app_logo_string: require('../app/assets/MyFace_logo_string.png'),
    app_icon: require('../app/assets/MyFace_icon.png'),
    app_close_logo: require('../app/assets/close.png'),
    brand_color: "#14533E",
 
    faces: {
        Surprise: {face: 'Surprise', img: require("../app/assets/Surprise.png"), count: 0},
        Fear: {face: 'Fear', img:require("../app/assets/Fear.png"), count: 0},
        Disgust: {face: 'Disgust', img:require("../app/assets/Disgust.png"), count: 0},
        Anger: {face: 'Anger', img:require("../app/assets/Anger.png"), count: 0},
        Sadness: {face: 'Sadness', img:require("../app/assets/Sadness.png"), count: 0},
        Happiness: {face: 'Happiness', img:require("../app/assets/Happiness.png"), count: 0}
    }
    
}