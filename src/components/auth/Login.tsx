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
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { COLORS } from "../../common";
import styles from "./Login.style";
import { BackBtn, FormButton, FormInput } from "../../ui";
import { LoginSchema } from "../../utils";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

type AppRouteProp = RouteProp<RootStackParamList, "Login">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function Login({ navigation, route }: Props) {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

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

  const login = async (values) => {};

  const initialUserData = {
    username: "",
    password: "",
  };

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <BackBtn onPress={() => navigation.goBack()} />
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
                loader={loader}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("Register");
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
