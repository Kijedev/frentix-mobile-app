// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function CustomTabBar({ state, descriptors, navigation }: any) {
//     const insets = useSafeAreaInsets();

//     const icons: any = {
//         index: "home",
//         insight: "analytics",
//         Cards: "card",
//         Profile: "person",
//     };

//     return (
//         <View
//             style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//             }}
//         >
//             <View className="flex-row justify-between items-center bg-[#111111] px-6 py-4">
//                 {state.routes.map((route: any, index: number) => {
//                     const isFocused = state.index === index;

//                     const onPress = () => {
//                         const event = navigation.emit({
//                             type: "tabPress",
//                             target: route.key,
//                             canPreventDefault: true,
//                         });

//                         if (!isFocused && !event.defaultPrevented) {
//                             navigation.navigate(route.name);
//                         }
//                     };

//                     const isMiddle = index === Math.floor(state.routes.length / 2);

//                     return (
//                         <TouchableOpacity
//                             key={route.key}
//                             onPress={onPress}
//                             activeOpacity={0.8}
//                             className="items-center justify-center flex-1"
//                         >
//                             {isMiddle ? (
//                                 <View className="bg-purple-600 h-16 w-16 rounded-full items-center justify-center -mt-10 shadow-lg">
//                                     <Ionicons name="scan" size={28} color="#fff" />
//                                 </View>
//                             ) : (
//                                 <>
//                                     <Ionicons
//                                         name={icons[route.name]}
//                                         size={22}
//                                         color={isFocused ? "#fff" : "#888"}
//                                     />
//                                     <Text className={`text-xs mt-1 ${isFocused ? "text-white" : "text-gray-400"}`}>
//                                         {route.name}
//                                     </Text>
//                                 </>
//                             )}
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         </View>
//     );
// }

import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { JSX } from "react";
// import { JSX } from "react";
import { StyleSheet, Text, View } from "react-native";

type IconProps = { color: string };

const icon: Record<string, (props: IconProps & { focused?: boolean }) => JSX.Element> = {
    index: ({ color, focused }) => (
        <Ionicons name={focused ? "home" : "home-outline"} size={20} color={color} />
    ),
    insight: ({ color, focused }) => (
        <Ionicons name={focused ? "analytics" : "analytics-outline"} size={20} color={color} />
    ),
    Wallet: ({ color, focused }) => (
        <Ionicons name={focused ? "scan" : "scan"} size={20} color="white" backgroundColor="#722cebff" style={{ borderRadius: 50, padding: 10 }} />
    ),
    Cards: ({ color, focused }) => (
        <Ionicons name={focused ? "card" : "card-outline"} size={20} color={color} />
    ),
    Profile: ({ color, focused }) => (
        <Ionicons name={focused ? "person" : "person-outline"} size={20} color={color} />
    ),
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
            <BlurView intensity={20} tint="light" style={styles.tabbar}>
                {state.routes.map((route, index) => {
                    const { name, key, params } = route;
                    const { options } = descriptors[key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(name, params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({ type: "tabLongPress", target: key });
                    };

                    const IconComponent = icon[name];
                    const label = options.tabBarLabel ?? options.title ?? name;

                    return (
                        <PlatformPressable
                            key={key}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabbarItem}
                        >
                            <View
                                style={[
                                    styles.iconWrapper,
                                    isFocused && styles.activeIconWrapper,
                                ]}
                            >
                                {IconComponent && (
                                    <IconComponent color={isFocused ? "#fff" : "#777"} focused={isFocused} />
                                )}
                            </View>
                            <Text style={{ color: isFocused ? "white" : "#777", fontSize: 10, marginTop: 2 }}>
                                {label}
                            </Text>
                        </PlatformPressable>
                    );
                })}
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        overflow: "hidden",
        // shadowColor: "#000",
        // backgroundColor: "red",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
        gap: 20,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    activeIconWrapper: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
    },
});
