import React from "react";
import { Text, View, Image, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailProduct = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default DetailProduct;
