import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomKeyAvoidingView from "../../ui/CustomKeyAvoidingView";
import HorizontalImageList from "./HorizontalImageList";
import colors from "../../utils/colors";
import { selectImages } from "../../utils/helper";
import OptionModal from "./OptionModal";
import { Formik } from "formik";
import { menuUpsertDto } from "../../interfaces/dto";
import { menuUpsertSchema } from "../../utils/validator";
import { FormButton, FormInput } from "../../ui";
import { COLORS, FONTS, SIZES } from "../../common";
import RNPickerSelect from "react-native-picker-select";
import { SD_Categories } from "../../common/SD";

const imageOptions = [{ value: "Remove Image", id: "remove" }];

const initialData: menuUpsertDto = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};

// Use the enum values for the picker options
const Categories = [
  { label: SD_Categories.APPETIZER, value: SD_Categories.APPETIZER },
  { label: SD_Categories.BEVERAGES, value: SD_Categories.BEVERAGES },
  { label: SD_Categories.DESSERT, value: SD_Categories.DESSERT },
  { label: SD_Categories.ENTREE, value: SD_Categories.ENTREE },
];

const inValidForm = () => {
  Alert.alert("Invalid Form", "Please provide all required fields", [
    {
      text: "Close",
      onPress: () => {},
    },
  ]);
};

const onHandleSubmit = async (menuItemInputs: menuUpsertDto) => {
  console.log(menuItemInputs);
};

export default function MenuItemUpsert() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnImageSelection = async () => {
    const newImages = await selectImages();
    setImages([...images, ...newImages]);
  };

  const FormixForm = () => (
    <Formik
      initialValues={initialData}
      validationSchema={menuUpsertSchema}
      onSubmit={(values) => onHandleSubmit(values)}
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
          <View>
            <FormInput
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
            />

            {touched.name && errors.name && (
              <Text style={styles.errorMessage}>{errors.name}</Text>
            )}
          </View>

          <FormInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange("description")}
            multiline
            numberOfLines={4}
          />

          <FormInput
            placeholder="specialTag"
            value={values.specialTag}
            onChangeText={handleChange("specialTag")}
          />

          <View>
            <FormInput
              placeholder="price"
              value={values.price}
              onChangeText={handleChange("price")}
              keyboardType="numeric"
            />
            {touched.price && errors.price && (
              <Text style={styles.errorMessage}>{errors.price}</Text>
            )}
          </View>

          <View>
            <RNPickerSelect
              style={{
                inputAndroid: styles.inputAndroid,
                viewContainer: styles.pickerContainer,
              }}
              onValueChange={(value) => setFieldValue("category", value)}
              items={Categories}
              placeholder={{ label: "Select category...", value: null }}
              value={values.category}
            />
            {touched.category && errors.category && (
              <Text style={styles.errorMessage}>{errors.category}</Text>
            )}
          </View>

          <FormButton
            loading={loading}
            title={"Submit"}
            onPress={isValid ? handleSubmit : inValidForm}
            isValid={isValid}
          />
        </View>
      )}
    </Formik>
  );

  return (
    <CustomKeyAvoidingView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Pressable
            onPress={handleOnImageSelection}
            style={styles.fileSelector}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="images" size={24} color="black" />
            </View>
            <Text style={styles.btnTitle}>Add Images</Text>
          </Pressable>

          <HorizontalImageList
            images={images}
            onLongPress={(img) => {
              setSelectedImage(img);
              setShowImageOptions(true);
            }}
          />
        </View>

        {/* Image Options */}
        <OptionModal
          visible={showImageOptions}
          onRequestClose={setShowImageOptions}
          options={imageOptions}
          renderItem={(item) => {
            return <Text style={styles.imageOption}>{item.value}</Text>;
          }}
          onPress={(option) => {
            if (option.id === "remove") {
              const newImages = images.filter((img) => img !== selectedImage);
              setImages([...newImages]);
            }
          }}
        />

        <FormixForm />
      </View>
    </CustomKeyAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  imageContainer: { flexDirection: "row" },
  btnTitle: {
    color: colors.primary,
    marginTop: 5,
  },
  fileSelector: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 7,
  },
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 5,
  },
  imageOption: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.primary,
    padding: 10,
  },
  inputAndroid: {
    color: COLORS.primary,
    marginHorizontal: -10,
    marginVertical: -5,
  },
  pickerContainer: {
    borderWidth: 0.3,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    marginBottom: 15,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
});
