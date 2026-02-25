import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuccessScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#0C0C0C] px-6 justify-center">
            <View className="items-center">
                <LottieView
                    source={require("@/assets/Lottie/Card.json")}
                    autoPlay
                    loop
                    style={{ width: 300, height: 300, marginTop: 50 }}
                />

                <Text className="text-white font-inter text-4xl font-bold">
                    Payment Successful!
                </Text>

                <Text className="text-white/50 font-inter text-sm text-center mt-2">
                    Your payment has been processed successfully.
                </Text>

                {/* Buttons */}
                <TouchableOpacity
                    className="border border-purple-500 rounded-2xl py-4 px-10 mt-8 w-full items-center"
                >
                    <Text className="text-purple-400 font-semibold">
                        Download Receipt
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    className="mt-4 w-full"
                    onPress={(() => {
                        router.push('/(tabs)')
                    })}>
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
                        <Text className="font-inter text-white text-center font-semibold text-base">
                            Back to Home
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}