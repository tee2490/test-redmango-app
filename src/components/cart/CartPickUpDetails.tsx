import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./CartPickUpDetails.style";
import { FormInput } from "../../ui";
import { COLORS, MiniLoader } from "../../common";
import { PickupDetailsSchema } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { apiResponse, cartItemModel } from "../../interfaces";
import { cartPickUpDto } from "../../interfaces/dto";
import { useInitiatePaymentMutation } from "../../redux/apis/paymentApi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigates/typeRootStack";

const CartPickUpDetails: React.FC = () => {
  const [initiatePayment] = useInitiatePaymentMutation();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setLoading] = useState(false);

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  let grandTotal = 0;
  let totalItems = 0;

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const initialUserData: cartPickUpDto = {
    name: userData.fullName!,
    email: "Test@email.com",
    phoneNumber: "1234567",
  };

  const onSubmit = async (userInput: cartPickUpDto) => {
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);
    const orderSummary = { grandTotal, totalItems };

    navigate("PaymentScreen", {
      state: { apiResult: data?.result, userInput },
    });
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialUserData}
      validationSchema={PickupDetailsSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <ScrollView>
          <View style={styles.container}>
            <FormInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="name..."
            />
            {touched.name && errors.name ? (
              <Text style={styles.error}>{errors.name}</Text>
            ) : null}

            <FormInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="email..."
              keyboardType="email-address"
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <FormInput
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              placeholder="phone number..."
              keyboardType="phone-pad"
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            ) : null}

            <View style={styles.summary}>
              <Text>Grand Total: ${grandTotal.toFixed(2)}</Text>
              <Text>No of items: {totalItems}</Text>
            </View>

            {loading ? (
              <MiniLoader />
            ) : (
              <Button
                onPress={() => handleSubmit()}
                title="Looks Good? Place Order!"
                color={COLORS.success}
                disabled={!isValid}
              />
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default CartPickUpDetails;
