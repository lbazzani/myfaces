import React, { useContext, useState } from "react";
import Modal from "modal-react-native-web";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Image, Button, Avatar, Header, Overlay } from "react-native-elements";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import ProductOverlay from "../components/ProductOverlay"
import * as RootNavigation from "../RootNavigation";
import xpsetting from "../xpsetting";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const MenuHeaderWeb = ({ user, navigation, title }) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const toggleProductsOverlay = () => {
    setVisibleProducts(!visibleProducts);
  };

  return (
    <View>
      <Overlay style={styles.overlay} isVisible={visibleProducts} onBackdropPress={toggleProductsOverlay} ModalComponent={Modal}>
        <ProductOverlay/>
      </Overlay>

      <Header
        barStyle="light-content"
        leftComponent={
          <Image
            source={xpsetting.app_logo}
            resizeMode='contain'
            style={styles.image}
            />
        }
        centerComponent={
          title ? (
            <Text style={styles.text}>{title}</Text>
          ) : (
            <TouchableOpacity onPress={toggleProductsOverlay}>
              <FontAwesome5 name="paw" size={20} color="#1DA1F2" />
            </TouchableOpacity>
          )
        }
        rightComponent={<Feather name="star" size={20} color="#1DA1F2" />}
        containerStyle={{
          backgroundColor: "#fff",
          justifyContent: "space-around",
          height: 50,
          paddingTop: 0,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  image: {
    height: 50,
    width: 150,
  },
  overlay: {
    //height: "400",
    justifyContent: "center",
    alignItems: 'flex-end'
  },
});
export default withNavigation(MenuHeaderWeb);
