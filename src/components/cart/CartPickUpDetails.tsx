import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './CartPickUpDetails.style';

const PickupDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be digits')
    .min(10, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

const CartPickUpDetails: React.FC = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', phoneNumber: '' }}
      validationSchema={PickupDetailsSchema}
      onSubmit={(values) => {
        console.log(values);
        // Handle form submission
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
       <ScrollView>
         <View style={styles.container}>
          {/* <Text style={styles.label}>Pickup Name</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="name..."
          />
          {touched.name && errors.name ? (
            <Text style={styles.error}>{errors.name}</Text>
          ) : null}

           <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="email..."
            keyboardType="email-address"
          />
          {touched.email && errors.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            placeholder="phone number..."
            keyboardType="phone-pad"
          />
          {touched.phoneNumber && errors.phoneNumber ? (
            <Text style={styles.error}>{errors.phoneNumber}</Text>
          ) : null}

          <View style={styles.summary}>
            <Text>Grand Total: $994.64</Text>
            <Text>No of items: 36</Text>
          </View>

          <Button onPress={handleSubmit} title="Looks Good? Place Order!" color="#28a745" />
        </View>
       </ScrollView>
      )}
    </Formik>
  );
};


export default CartPickUpDetails
