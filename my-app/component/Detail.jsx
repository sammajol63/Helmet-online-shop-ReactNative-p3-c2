import React from "react";
import {
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from "@apollo/client";
import { READ_DETAIL_PRODUCT } from "../queries";

const DetailList = ({ route }) => {
  const { loading, error, data } = useQuery(READ_DETAIL_PRODUCT, {
    variables: {
      slug: route.params.slug,
    },
  });
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // console.log(data, `<<<<<`);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View className="bg-[#000000] mt-[8] h-36">
          <View className="w-3">
            <Image
              source={{
                uri: "https://www.kythelmet.com//assets/img/logo.png",
              }}
              className="h-12 w-32 ml-32 mt-12"
            />
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://www.goodwood.com/globalassets/.road--racing/race/modern/2021/11-november/2022-motogp-calendar/2022-motogp-calendar-fabio-quartararo-21-barcelona-gold-and-goose-mi-goodwood-04112021.jpg?crop=(0,0,2600,1463)&width=1600",
            }}
            className="h-28 w-100"
          />
        </View>
        <View className="bg-slate-300 w-screen h-96 mx-1 mt-3">
          <Image
            source={{
              uri: `${data.getOneProduct.mainImg}`,
            }}
            className="h-96 w-96 mx-auto"
            resizeMode="stretch"
          />
        </View>
        <View className="bg-black h-96">
          <View className="bg-red-700 h-10 w-60 mt-5 rounded-sm">
            <Text className="mt-2 mx-auto text-gray-100 font-bold">
              DESCRIPTION & SPECIFICATION
            </Text>
          </View>
          <Text className="mx-auto text-gray-100 font-bold font mt-2">
            {" "}
            {data.getOneProduct.name}
          </Text>
          <Text className="text-gray-100 mt-2">
            {data.getOneProduct.description}
          </Text>
          <Text className="mt-40 text-gray-100">
            Created By: {data.getOneProduct.userMongo.email}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailList;
