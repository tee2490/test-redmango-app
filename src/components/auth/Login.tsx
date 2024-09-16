import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { COLORS } from "../../common";
import styles from "./Login.style";
import { BackBtn, FormButton, FormInput } from "../../ui";
import { LoginSchema } from "../../utils";
import { loginDto } from "../../interfaces/dto";
import { apiResponse, userModel } from "../../interfaces";
import { useLoginUserMutation } from "../../redux/apis/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../redux/userAuthSlice";
import { jwtDecode } from "jwt-decode";
import { showMessage } from "react-native-flash-message";

export default function Login() {
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
    ]);
  };

  const login = async (userInput: loginDto) => {
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.username,
      password: userInput.password,
    });

    if (response.data) {
      console.log(response.data);
      const { token } = response.data.result;
      await AsyncStorage.setItem("token", token);

      const { fullName, id, email, role }: userModel = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));

      navigate("ProfileScreen");
    } else if (response.error) {
      showMessage({
        message: response.error.data.errorMessages[0],
        type: "warning",
        backgroundColor: COLORS.tertiary,
        color: COLORS.white,
        icon: { icon: "auto", position: "left" }, // Icon auto-detected by type or custom icon
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const initialUserData: loginDto = {
    username: "admin",
    password: "123",
  };

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <BackBtn onPress={() => navigate("ProfileScreen")} />
        <Image source={require("../../Images/bk.png")} style={styles.cover} />

        <Text style={styles.title}>Unlimited Luxurious RedMango</Text>
        <Formik
          initialValues={initialUserData}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>User name</Text>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <FormInput
                    placeholder="User name"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <FormInput
                    secureTextEntry={obsecureText}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    style={{ flex: 1 }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <FormButton
                loading={loading}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              <Text
                style={styles.registration}
                onPress={() => {
                  navigate("Register");
                }}
              >
                Register
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
