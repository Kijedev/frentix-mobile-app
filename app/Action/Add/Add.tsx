import { useTransactions } from "@/app/context/TransactionContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const users = [
    { id: "1", name: "Savannah Nguyen", account: "**** 5688", image: "https://i.pravatar.cc/150?img=32" },
    { id: "2", name: "Devon Lane", account: "**** 7510", image: "https://i.pravatar.cc/150?img=12" },
    { id: "3", name: "Cameron Williamson", account: "**** 9012", image: "https://i.pravatar.cc/150?img=45" },
];

export default function PayScreen() {
    const [amount, setAmount] = useState("0");
    const [note, setNote] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { addTransaction } = useTransactions();

    const handlePress = (value: string) => {
        if (value === "del") {
            setAmount((prev) => prev.slice(0, -1) || "0");
        } else {
            setAmount((prev) => (prev === "0" ? value : prev + value));
        }
    };

    const handlePay = () => {
        if (!selectedUser) return;
        addTransaction({
            id: Date.now().toString(),
            name: selectedUser.name,
            amount: amount,
            note: note,
            date: new Date().toISOString(),
        });
        router.push("/Action/Add/success");
    };

    const formatAmount = (num: string) => Number(num).toLocaleString();
    const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "del"];

    return (
        <SafeAreaView className="flex-1 bg-[#0A0A0A]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 220 }}
                    className="px-6"
                >
                    {/* Header */}
                    <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-lg font-semibold">Pay Money</Text>
                        <View className="w-6" />
                    </View>

                    {/* Dropdown */}
                    <View className="mt-6">
                        <TouchableOpacity
                            onPress={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-[#1C1C1E] p-4 rounded-2xl flex-row justify-between items-center"
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="person-outline" size={24} color="white" className="mr-2" />
                                <Text className="font-inter text-white">
                                    {selectedUser ? selectedUser.name : "Select Recipient"}
                                </Text>
                            </View>
                            <Ionicons name="chevron-down" size={20} color="white" />
                        </TouchableOpacity>

                        {dropdownOpen && (
                            <View className="bg-[#1C1C1E] absolute top-14 left-0 right-0 w-full z-20 mt-2 rounded-2xl overflow-hidden">
                                {users.map((user) => (
                                    <TouchableOpacity
                                        key={user.id}
                                        onPress={() => {
                                            setSelectedUser(user);
                                            setDropdownOpen(false);
                                        }}
                                        className="p-4 border-b border-gray-800"
                                    >
                                        <Text className="font-inter text-white">{user.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Selected User Info */}
                    {selectedUser && (
                        <View className="mt-4 items-center">
                            <Image
                                source={{ uri: selectedUser.image }}
                                className="w-20 h-20 rounded-full border-2 border-[#8437F9]"
                            />
                            <Text className="font-inter text-white font-semibold text-2xl mt-2 text-center">
                                {selectedUser.name}
                            </Text>
                            <Text className="font-inter text-white/50 text-center text-sm">
                                {selectedUser.account}
                            </Text>
                        </View>
                    )}
                </ScrollView>

                <View className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] p-4">
                    {/* Amount */}
                    <View className="items-center mt-8 mb-6">
                        <Text className="text-white text-4xl font-bold font-inter">${formatAmount(amount)}</Text>
                    </View>
                    {/* Note Input */}
                    <View className="mt-6 bg-[#1C1C1E] text-white p-2 rounded-2xl flex-row items-center mb-4">
                        <Ionicons name="pencil-outline" size={24} color="white" className="mr-2" />
                        <TextInput
                            placeholder="Add a note (optional)"
                            placeholderTextColor="#888"
                            value={note}
                            onChangeText={setNote}
                            className="text-white flex-1"
                        />
                    </View>
                    <View className="flex-row flex-wrap justify-between mb-4">
                        {keypad.map((key, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePress(key)}
                                className="bg-[#1A1A1A] w-[30%] h-16 rounded-2xl mb-2 items-center justify-center"
                            >
                                {key === "del" ? (
                                    <Ionicons name="backspace-outline" size={22} color="white" />
                                ) : (
                                    <Text className="text-white text-2xl">{key}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Send Button */}
                    {selectedUser && (
                        <TouchableOpacity
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                handlePay();
                            }}
                            className="bg-purple-600 h-16 rounded-2xl items-center justify-center"
                        >
                            <Text className="text-white text-lg font-semibold">Send</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}