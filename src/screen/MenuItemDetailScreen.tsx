import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import styles from "./MenuItemDetailScreen.style";
import { COLORS, SIZES } from "../constants";
import { menuItemModel } from "../interfaces";
import { RootStackParamList } from "../navigates/typeRootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MenuItemDetailScreen'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'MenuItemDetailScreen'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route : DetailsScreenRouteProp;
};


const MenuItemDetailScreen = ({navigation,route} : Props) => {
  const { item } = route.params

  return (
    <View>
      <Text>MenuItemDetailScreen {item.name}</Text>
     <Button title="Go Back" onPress={()=>navigation.goBack()}/>
     <Text>MenuItemDetailScreen {item.name}</Text>
    </View>
  )
}

export default MenuItemDetailScreen


// export default function MenuItemDetailScreen( navigation : Props)
//  {
//   const route = useRoute();
//   const { item }:any = route.params;
//   const [count, setCount] = useState(1);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [favorites, setFavorites] = useState(false);
//   const [paymentUrl, setPaymentUrl] = useState(false);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   const decrement = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };


//   return (
//     <View style={styles.container}>
//         <View style={styles.container}>
//           <View style={styles.upperRow}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Ionicons name="chevron-back-circle" size={30} />
//             </TouchableOpacity>
 
//           </View>
//           <Image
//             source={{
//               uri: item.imageUrl,
//             }}
//             style={styles.image}
//           />

//           <View style={styles.details}>
//             <View style={styles.titleRow}>
//               <Text style={styles.title}>{item.title}</Text>
//               <View style={styles.priceWrapper}>
//                 <Text style={styles.price}>$ {item.price}</Text>
//               </View>
//             </View>

//             <View style={styles.ratingRow}>
//               <View style={styles.rating}>
//                 {[1, 2, 3, 4, 5].map((index) => (
//                   <Ionicons key={index} name="star" size={24} color="gold" />
//                 ))}

//                 <Text style={styles.ratingText}> (4.9)</Text>
//               </View>

//               <View style={styles.rating}>
//                 <TouchableOpacity onPress={() => increment()}>
//                   <SimpleLineIcons name="plus" size={20} />
//                 </TouchableOpacity>
//                 <Text style={styles.ratingText}>{count}</Text>

//                 <TouchableOpacity onPress={() => decrement()}>
//                   <SimpleLineIcons name="minus" size={20} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.descriptionWraper}>
//               <Text style={styles.description}>Description</Text>
//               <Text style={styles.descText}>{item.description}</Text>
//             </View>

//             <View style={{ marginBottom: SIZES.small }}>
//               <View style={styles.location}>
//                 <View style={{ flexDirection: "row" }}>
//                   <Ionicons name="location-outline" size={20} />
//                   <Text> {item.product_location}</Text>
//                 </View>

//                 <View style={{ flexDirection: "row" }}>
//                   <MaterialCommunityIcons
//                     name="truck-delivery-outline"
//                     size={20}
//                   />
//                   <Text> Free Delivery </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.cartRow}>
//               <TouchableOpacity
//                 onPress={() => {}}
//                 style={styles.cartBtn}
//               >
//                 <Text style={styles.cartTitle}>BUY NOW </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => {}}
//                 style={styles.addCart}
//               >
//                 <Fontisto
//                   name="shopping-bag"
//                   size={22}
//                   color={COLORS.lightWhite}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )
//     </View>
//   );
// };


