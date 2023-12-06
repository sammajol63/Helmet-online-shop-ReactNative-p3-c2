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
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery, gql } from "@apollo/client";
import { READ_PRODUCTS } from "../queries";

const Tab = createBottomTabNavigator();

const Detail = ({ navigation }) => {
  const { loading, error, data } = useQuery(READ_PRODUCTS);
  // console.log(data, loading, error, `<<<<<<<<INI`);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="bg-[#000000] mt-[8] h-12">
        <View className="w-3 ml-3">
          <Image
            source={{
              uri: "https://www.kythelmet.com//assets/img/logo.png",
            }}
            className="h-9 w-24 mt-1"
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
      <View className="flex-row-reverse">
        <View className="w-screen h-screen">
          <View className=" flex-row">
            <View className="w-1/4 h-8 bg-red-600">
              <Text className="text-white text-center mt-1.5">RACING</Text>
            </View>
            <View className="w-1/4 h-8 bg-black">
              <Text className="text-white text-center mt-1.5">SPORT</Text>
            </View>
            <View className="w-1/4 h-8 bg-black">
              <Text className="text-white text-center mt-1.5">CITY</Text>
            </View>
            <View className="w-1/4 h-8 bg-black">
              <Text className="text-white text-center mt-1.5">OFF ROAD</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-64">
            <View className="flex-row flex-wrap mx-auto ml-2.5">
              {data.getProducts.map((el) => {
                return (
                  <View className="bg-slate-300 w-44 h-52 rounded-lg mx-1 mt-3">
                    <Image
                      source={{
                        uri: `${el.mainImg}`,
                      }}
                      className="h-40 w-40 mx-auto"
                      resizeMode="stretch"
                    />
                    <TouchableOpacity className="bg-red-600 w-40 h-9 mb-4 rounded-lg mx-auto">
                      <Text
                        className="text-white mx-auto mt-2"
                        onPress={() =>
                          navigation.navigate("Detail", {
                            slug: `${el.slug}`,
                          })
                        }
                      >
                        SEE DETAIL{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View className="w-28 h-screen bg-black"></View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
