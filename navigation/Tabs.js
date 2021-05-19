import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Home from "../screens/Home";
import Scan from "../screens/Scan";
import SignUp from "../screens/SignUp";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import {
    createBottomTabNavigator,
    BottomTabBar,
} from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                showLabel: false,
                style: {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "transparent",
                    elevation: 0,
                    tintColor: COLORS.secondary
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.more}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan"
                component={Scan}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.scan}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={SignUp}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
