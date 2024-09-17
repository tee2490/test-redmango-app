import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomKeyAvoidingView from "../../ui/CustomKeyAvoidingView";
import HorizontalImageList from "./HorizontalImageList";
import colors from "../../utils/colors";
import { selectImages } from "../../utils/helper";
import OptionModal from "./OptionModal";

const imageOptions = [{ value: "Remove Image", id: "remove" }];

export default function MenuItemUpsert() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleOnImageSelection = async () => {
    const newImages = await selectImages();
    setImages([...images, ...newImages]);
  };

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
});
