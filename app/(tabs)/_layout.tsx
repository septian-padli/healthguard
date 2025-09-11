import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: any) => {
    return focused ? (
        <View
            className="flex flex-col justify-center items-center aspect-square min-w-20 min-h-16 rounded-2xl bg-green-normal gap-1 w-full"
        >
            <Image source={icon} tintColor="#151312" className="size-5" />
            <Text className="text-xs font-jakartaSemiBold text-gray-800">{title}</Text>
        </View>
    ) : (
        <View className="flex justify-center items-center aspect-square min-w-16 min-h-16 rounded-full">
            <Image source={icon} tintColor="#a8b5db" className="size-5" />
        </View>
    );
};

const _Layout = () => {
    return (
        <>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarItemStyle: {
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        height: 92,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 16,
                        paddingBottom: 16,
                        paddingHorizontal: 16

                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.home} title="Home" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="together"
                    options={{
                        title: "Together",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.flag} title="Together" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="start"
                    options={{
                        title: "Start",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.record} title="Start" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="history"
                    options={{
                        title: "History",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.route} title="History" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.settings} title="Profile" />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}

export default _Layout

const styles = StyleSheet.create({})