import { FC, useState } from "react";
import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import colors from "../../utils/colors";
import { COLORS, SIZES } from "../../common";
import { SD_Categories } from "../../common/SD";

interface Props {
  categoryList?: string[];
}

const LIST_ITEM_SIZE = 80;

const categoryTest = [
  SD_Categories.APPETIZER,
  SD_Categories.ENTREE,
  SD_Categories.DESSERT,
  SD_Categories.BEVERAGES,
  "Test"
];

const CategoryList: FC<Props> = ({ categoryList = categoryTest }) => {
  const [selectedColor, setSelectedColor] = useState(SD_Categories.APPETIZER);

  const onSelect = (item:any) => {
    setSelectedColor(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => onSelect(item)} style={styles.listItem}>
              <View
                style={[
                  styles.iconContainer,
                  selectedColor === item && {
                    backgroundColor: COLORS.tertiary,
                  },
                ]}
              >
                <Text numberOfLines={2} style={styles.categoryName}>
                  {item}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  listItem: {
    width: LIST_ITEM_SIZE,
    marginRight: 10,
  },
  iconContainer: {
    width: LIST_ITEM_SIZE,
    height: LIST_ITEM_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.primary,
    backgroundColor: COLORS.secondary,
  },
  categoryName: {
    fontSize: SIZES.small+2,
    textAlign: "center",
    paddingTop: 2,
    color: colors.primary,
    textTransform: "capitalize",
  },
});

export default CategoryList;
