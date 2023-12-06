import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Product from "./component/Product.jsx";
import Home from "./component/Home.jsx";
import Detail from "./component/Detail";
import DetailProduct from "./component/DetailProduct.jsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

//bikin stacknya dlu, ini component pascalCase
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={Product}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ApolloProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Product") {
              iconName = focused ? "list-sharp" : "ios-list-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Product"
          component={MyStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    textAlign: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
