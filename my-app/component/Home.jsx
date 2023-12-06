import React, { useRef } from "react";
import { withExpoSnack } from "nativewind";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styled } from "nativewind";
const Tab = createBottomTabNavigator();
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const images = new Array(1).fill(
  "https://images.unsplash.com/photo-1533709896227-66c686ee7e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
);
images.push(
  "https://images.unsplash.com/photo-1514760263916-4ac83991b2e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
);
images.push(
  "https://images.unsplash.com/photo-1563473274787-f4256e6e8f72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
);

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
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
      <View class="justify-center">
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground
                  source={{ uri: image }}
                  style={styles.card}
                ></ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
      <View className="mt-[8]">
        <Image
          source={{
            uri: "https://www.kythelmet.com/uploads/images/article/full/Aleix-Espargaro-Moto-Gp.png",
          }}
          className="h-40 w-100"
        />
        <View className="justify-center">
          <Text className="text-center text-lg mt-7">World Class Helmet</Text>
          <Text className="text-center text-xs">
            #KYTHelmet #WorldClassHelmet
          </Text>
        </View>
      </View>
      <View className="flex-row-reverse mt-4">
        <View className="ml-3 mr-2">
          <Image
            source={{
              uri: "https://www.kythelmet.com/assets/img/services/6-2.png",
            }}
            className="h-28 w-28"
          />
        </View>
        <View className="ml-3">
          <Image
            source={{
              uri: "https://www.kythelmet.com/assets/img/services/7-2.png",
            }}
            className="h-28 w-28"
          />
        </View>
        <View className="ml-3">
          <Image
            source={{
              uri: "https://www.kythelmet.com/assets/img/services/logo-KYT_katalog.png",
            }}
            className="h-28 w-28"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
