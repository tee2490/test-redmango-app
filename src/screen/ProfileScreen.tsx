import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import styles from "./ProfileScreen.style";
import { COLORS } from "../common";
import { RootStackParamList } from "../navigates/typeRootStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userModel } from "../interfaces";
import { emptyUserState, setLoggedInUser } from "../redux/userAuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SD_Roles } from "../common/SD";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const userLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel pressed"),
        },
        {
          text: "Continue",
          onPress: () => userLogout(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel pressed"),
        },
        {
          text: "Continue",
          onPress: () => console.log("delete account pressed"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />

      <View style={{ width: "100%" }}>
        <Image source={require("../Images/space.jpg")} style={styles.cover} />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require("../Images/profile.jpeg")}
          style={styles.profile}
        />

        <Text style={styles.name}>
          {userData.id ? userData.fullName : "Please login into your account"}
        </Text>

        {!userData.id ? (
          <TouchableOpacity onPress={() => navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>L O G I N </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <Text style={styles.menuText}>{userData.email} </Text>
          </View>
        )}

        {userData.id && (
          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => navigate("MyOrderScreen")}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>My Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate("ShoppingCartScreen")}>
              <View style={styles.menuItem(0.2)}>
                <SimpleLineIcons name="bag" color={COLORS.primary} size={24} />
                <Text style={styles.menuText}>Cart</Text>
              </View>
            </TouchableOpacity>

            {userData.role == SD_Roles.ADMIN && (
              <TouchableOpacity
                onPress={() => navigate("AllOrderScreen")}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>All Orders</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => deleteAccount()}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign name="deleteuser" color={COLORS.primary} size={24} />
                <Text style={styles.menuText}>Delete Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logout()}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign name="logout" color={COLORS.primary} size={24} />
                <Text style={styles.menuText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
