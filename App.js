import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import  Icon  from "react-native-vector-icons/Ionicons";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import SignInScreen from "./screens/SignInScreen";
import NumberScreen from "./screens/NumberScreen";
import VerificationScreen from "./screens/VerificationScreen";
import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/locationscreen"
import LoginScreen from "./screens/loginscreen"
import SignupScreen from "./screens/signupscreen"
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/AccountScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CategoryScreen from "./screens/CategoryScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import { CartProvider } from './screens/CartContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ExploreHome" component={ExploreScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'ExploreHome';

  const hiddenRoutes = ['Category', 'ProductDetail'];
  const isTabBarHidden = hiddenRoutes.includes(routeName);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: isTabBarHidden ? { display: 'none' } : {},
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Explore') iconName = 'search-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          else if (route.name === 'Favourite') iconName = 'heart-outline';
          else if (route.name === 'Account') iconName = 'person-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavoriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="NumberScreen" component={NumberScreen} />
        <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        
        {/* Đây là Tab chính sau khi đăng nhập xong */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer></CartProvider>
  );
}