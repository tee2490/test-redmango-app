import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { RegisterSchema } from "../../utils";
import { COLORS } from "../../common";
import styles from "./Login.style";
import { BackBtn, FormButton, FormInput } from "../../ui";
import { SD_Roles } from "../../common/SD";
import RNPickerSelect from "react-native-picker-select";
import { useRegisterUserMutation } from "../../redux/apis/authApi";
import { apiResponse } from "../../interfaces";
import { registerDto } from "../../interfaces/dto";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

type AppRouteProp = RouteProp<RootStackParamList, "Register">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function Register({ navigation, route }: Props) {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);

  // Use the enum values for the picker options
  const userTypeOptions = [
    { label: "Admin", value: SD_Roles.ADMIN },
    { label: "Customer", value: SD_Roles.CUTOMER },
  ];

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Close",
        onPress: () => {},
      },
    ]);
  };

  const register = async (userInput: registerDto) => {
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.username,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });
    if (response.data) {
      console.log(response.data);
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0]);
    }

    setTimeout(() => {
      setLoading(false);
     }, 500);
  };

  const initialUserData: registerDto = {
    username: "",
    password: "",
    name: "",
    role: "",
  };

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <Image source={require("../../Images/bk.png")} style={styles.cover} />

        <Text style={styles.title}>Unlimited Luxurious RedMango</Text>
        <Formik
          initialValues={initialUserData}
          validationSchema={RegisterSchema}
          onSubmit={(values) => register(values)}
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
            setFieldValue,
          }) => (
            <View>
              <View style={styles.wrapper}>
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
                <View
                  style={styles.inputWrapper(
                    touched.name ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="order-alphabetical-ascending"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <FormInput
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorMessage}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
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

              <View style={styles.wrapper}>
                <View
                  style={styles.inputWrapper(
                    touched.role ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="account-cog-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <View style={pickerStyle.container}>
                    <RNPickerSelect
                      style={{ inputAndroid: { color: COLORS.primary } }}
                      onValueChange={(value) => setFieldValue("role", value)}
                      items={userTypeOptions}
                      placeholder={{ label: "Select...", value: null }}
                      value={values.role}
                    />
                  </View>
                </View>
                {touched.role && errors.role && (
                  <Text style={styles.errorMessage}>{errors.role}</Text>
                )}
              </View>

              <FormButton
                loading={loading}
                title={"R E G I S T E R"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const pickerStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -15,
    marginRight: -15,
  },
});
