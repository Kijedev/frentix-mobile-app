import { useTransactions } from "@/app/context/TransactionContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PayScreen() {
    const { addTransaction } = useTransactions();

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const formattedAmount =
        amount === "" ? "0" : Number(amount).toLocaleString();

    const handlePay = async () => {
        const numericAmount = Number(amount);

        if (!numericAmount || numericAmount <= 0) return;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        const success = addTransaction({
            name: "Deposit",
            amount: numericAmount,
            note,
            type: "sent",
        });

        if (success) {
            router.push("/Action/Add/success");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#0A0A0A]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    className="px-6"
                >
                    {/* Header */}
                    <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>

                        <Text className="text-white text-lg font-semibold">
                            Deposit to Balance
                        </Text>

                        <View className="w-6" />
                    </View>

                    {/* Amount Section */}
                    <View className="flex-1 justify-center items-center h-full">
                        <TextInput
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="₦0"
                            placeholderTextColor="#666"
                            className={`text-6xl font-inter text-center font-semibold w-full ${amount ? "text-white" : "text-white/40"
                                }`}
                        />
                        <Text className="font-inter text-white/40">Minimum Transfer Amount ₦100</Text>
                    </View>

                    {/* Send Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        // disabled={!amount || Number(amount) <= 0}
                        // onPress={handlePay}
                        onPress={() => router.push("/Action/Add/PaymentType")}
                        className="mb-8"
                    >
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
                            <Text className="font-inter text-white text-center text-base">
                                Add Money
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}