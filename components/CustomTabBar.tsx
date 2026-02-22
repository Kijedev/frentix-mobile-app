import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets();

    const icons: any = {
        index: "home",
        insight: "analytics",
        Cards: "card",
        Profile: "person",
    };

    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <View className="flex-row justify-between items-center bg-[#111111] px-6 py-4">
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    // Check if this is the middle tab
                    const isMiddle = index === Math.floor(state.routes.length / 2);

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            activeOpacity={0.8}
                            className="items-center justify-center flex-1"
                        >
                            {isMiddle ? (
                                // Middle tab: always elevated, with background, no label
                                <View className="bg-purple-600 h-16 w-16 rounded-full items-center justify-center -mt-10 shadow-lg">
                                    <Ionicons name="scan" size={28} color="#fff" />
                                </View>
                            ) : (
                                // Normal tabs
                                <>
                                    <Ionicons
                                        name={icons[route.name]}
                                        size={22}
                                        color={isFocused ? "#fff" : "#888"}
                                    />
                                    <Text className={`text-xs mt-1 ${isFocused ? "text-white" : "text-gray-400"}`}>
                                        {route.name}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}