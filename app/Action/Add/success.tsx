import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

                {/* Icon Circle */}
                <View className="bg-purple-600/20 p-8 rounded-full mb-6">
                    <Ionicons name="checkmark" size={50} color="#A855F7" />
                </View>

                <Text className="text-white font-inter text-2xl font-bold">
                    Payment Successful!
                </Text>

                <Text className="text-white/50 font-inter text-sm text-center mt-3">
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
                    onPress={() => router.replace("/(tabs)")}
                    className="bg-purple-600 rounded-2xl py-4 px-10 mt-4 w-full items-center"
                >
                    <Text className="text-white font-semibold">
                        Back to Home
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}