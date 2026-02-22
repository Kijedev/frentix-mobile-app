import "@/app/global.css";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const forgotpassword = () => {
    const [secureText, setSecureText] = useState(true);
    const [remember, setRemember] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-[#0A0A0A] px-6">
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
                className="bg-[#181818] rounded-full items-center justify-center h-12 w-12 mt-4"
            >
                <Text className="text-white text-2xl font-light">←</Text>
            </TouchableOpacity>

            <View className="items-center mt-10">
                <Text className="text-white text-4xl font-bold">
                    Forgot Password?
                </Text>
                <Text className="text-gray-400 text-center mt-3 text-lg max-w-xs">
                    Don't worry! enter Email Address, We'll send you reset instructions.
                </Text>
            </View>

            <View className="mt-5 space-y-6">
                <View className="mt-5">
                    <Text className="text-white mb-4">Email Address</Text>
                    <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
                        <Feather name="mail" size={18} color="#fff" />
                        <TextInput
                            placeholder="Enter Your Email"
                            placeholderTextColor="#fff"
                            className="flex-1 text-white ml-3"
                        />
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} className="mt-10">
                    <LinearGradient
                        colors={["#7C3AED", "#A855F7"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 rounded-full"
                        style={{
                            borderRadius: 12,
                            paddingVertical: 12,
                        }}
                    >
                        <Text className="text-white text-center font-semibold text-base">
                            Send
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default forgotpassword;