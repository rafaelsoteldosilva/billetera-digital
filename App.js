import React from "react";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useFonts } from 'expo-font';

import SignUp from "./screens/SignUp";
import Tabs from "./navigation/Tabs";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const stack = createStackNavigator();
const NavigatorWithDrawer = createDrawerNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <NavigatorWithDrawer.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="SignUp"
            >
                <NavigatorWithDrawer.Screen name="SignUp" component={SignUp} />

                {/* Tabs */}
                <NavigatorWithDrawer.Screen name="Home" component={Tabs} />
            </NavigatorWithDrawer.Navigator>
        </NavigationContainer>
    );
};

export default App;
