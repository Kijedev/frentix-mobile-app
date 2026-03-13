import { useNotifications } from "@/app/context/NotificationContext";
import { useTransactions } from "@/app/context/TransactionContext";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PayScreen() {
    const { addTransaction, balance } = useTransactions();
    const { addNotification } = useNotifications();

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const handlePay = async () => {
        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) return;

        // Haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        // Add transaction (simulated deposit)
        const success = addTransaction({
            name: "Deposit",
            amount: numericAmount,
            note: note || "Deposit",
            type: "received", // adds to balance
        });

        if (success) {
            // Add in-app notification (red dot)
            addNotification(
                "Deposit Successful 💰",
                `₦${numericAmount.toLocaleString()} has been added to your balance`
            );

            // Show a local notification on the device
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Deposit Successful 💰",
                    body: `₦${numericAmount.toLocaleString()} has been added to your balance`,
                    sound: true, // plays notification sound
                },
                trigger: null, // shows immediately
            });

            // Navigate to success page
            router.push("/Action/Add/success");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6 bg-[#0A0A0A]">
                <View className="flex-1 justify-center items-center">
                    <TextInput
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="₦0"
                        placeholderTextColor="#666"
                        className="text-6xl text-white font-bold text-center w-full"
                    />
                    <Text className="text-white/40 mt-2">Minimum Transfer Amount ₦100</Text>
                </View>

                <TouchableOpacity
                    onPress={handlePay}
                    activeOpacity={0.8}
                    className="mt-8 mb-8"
                >
                    <LinearGradient
                        colors={["#7C3AED", "#A855F7"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 rounded-full"
                        style={{ paddingVertical: Platform.OS === 'ios' ? 15 : 15, borderRadius: Platform.OS === 'ios' ? 10 : 10 }}
                    >
                        <Text className="text-white text-xl text-center font-semibold">
                            Add Money
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}