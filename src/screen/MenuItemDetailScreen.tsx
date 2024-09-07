import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { Ionicons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";
import styles from "./MenuItemDetailScreen.style";
import { COLORS, MiniLoader } from "../common";
import { RootStackParamList } from "../navigates/typeRootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { baseUrl, userTest } from "../common/SD";
import { useGetMenuItemByIdQuery } from "../redux/apis/menuItemApi";
import { useUpdateShoppingCartMutation } from "../redux/apis/shoppingCartApi";
import { userModel } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MenuItemDetailScreen"
>;

type AppRouteProp = RouteProp<
  RootStackParamList,
  "MenuItemDetailScreen"
>;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

const MenuItemDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data: item, isLoading } = useGetMenuItemByIdQuery(id);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("Login");
    }

    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userTest,
    });

    console.log(response);

    setTimeout(() => setIsAddingToCart(false), 500);
  };

  return (
    <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                color={COLORS.red}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: baseUrl + item.result.image,
            }}
            style={styles.image}
          />

          <View style={styles.details}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.result.name}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>$ {item.result.price}</Text>
              </View>
            </View>

            <View style={styles.categoryRow}>
              <View style={styles.category}>
                <Text> {item.result.category}</Text>
              </View>

              <View style={styles.countRow}>
                <TouchableOpacity onPress={() => handleQuantity(1)}>
                  <SimpleLineIcons name="plus" size={20} />
                </TouchableOpacity>
                <Text style={styles.countText}>{quantity}</Text>

                <TouchableOpacity onPress={() => handleQuantity(-1)}>
                  <SimpleLineIcons name="minus" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.descriptionWraper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descText}>{item.result.description}</Text>
            </View>

            <View style={styles.cartRow}>
              {isAddingToCart ? (
                <View style={styles.cartBtn}>
                  <MiniLoader color="red" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAddToCart(item.result?.id)}
                  style={styles.cartBtn}
                >
                  <Text style={styles.cartTitle}>ADD TO CART </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => {}} style={styles.addCart}>
                <Fontisto
                  name="shopping-bag"
                  size={22}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default MenuItemDetailScreen;
