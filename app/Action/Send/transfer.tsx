import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Transfer() {
    const [activeTab, setActiveTab] = useState<"bank" | "contact">("bank");

    const banks = [
        { name: "Bank Card", number: "**** 0330", color: "#C4F1BE" },
        { name: "Master Card", number: "**** 5870", color: "#BDE0FE" },
        { name: "Credit Card", number: "**** 2218", color: "#E0C3FC" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#0C0C0C]">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                className="px-5"
            >
                {/* HEADER */}
                <View className="flex-row items-center justify-between mt-4">
                    <TouchableOpacity onPress={(() => router.back())} className="bg-[#181818] h-10 w-10 rounded-full items-center justify-center">
                        <Ionicons name="arrow-back" size={20} color="#fff" />
                    </TouchableOpacity>

                    <Text className="text-white text-lg font-semibold">
                        Transfer
                    </Text>

                    <View className="w-10" />
                </View>

                {/* TAB SWITCH */}
                <View className="flex-row bg-[#141414] rounded-full p-1 mt-6">
                    <TouchableOpacity
                        onPress={() => setActiveTab("bank")}
                        className={`flex-1 py-3 rounded-full items-center ${activeTab === "bank" ? "bg-purple-600" : ""
                            }`}
                    >
                        <Text
                            className={`${activeTab === "bank"
                                ? "text-white font-semibold"
                                : "text-gray-400"
                                }`}
                        >
                            Bank
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab("contact")}
                        className={`flex-1 py-3 rounded-full items-center ${activeTab === "contact" ? "bg-purple-600" : ""
                            }`}
                    >
                        <Text
                            className={`${activeTab === "contact"
                                ? "text-white font-semibold"
                                : "text-gray-400"
                                }`}
                        >
                            Contact
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* BANK TAB CONTENT */}
                {activeTab === "bank" && (
                    <>
                        {/* SELECT BANK */}
                        <Text className="text-white mt-6 mb-4 text-xl font-medium">
                            Select a Bank
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {banks.map((bank, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ backgroundColor: bank.color }}
                                    className="rounded-2xl p-8 mr-4 w-40"
                                >
                                    <Text className="text-black font-semibold">
                                        {bank.name}
                                    </Text>
                                    <Text className="text-black/70 text-sm mt-1">
                                        {bank.number}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* FORM */}
                        <Text className="text-white mt-8 mb-4 text-xl font-medium">
                            Transfer Money to
                        </Text>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            className="mt-5"
                        >
                            <View className="space-y-4">
                                <Text className="text-white mb-4">Bank Name</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="person-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Bank Name"
                                        placeholderTextColor="#666"
                                        className="text-white ml-3 flex-1 py-2"
                                    />
                                </View>

                                <Text className="text-white mb-4 mt-6">Card Number</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="card-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Card Number"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        className="text-white ml-3 flex-1 py-2"
                                    />
                                </View>

                                <Text className="text-white mb-4 mt-6">Amount</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="cash-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Amount"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        className="text-white ml-3 flex-1 py-2"
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
                                        Transfer
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </>
                )}

                {/* CONTACT TAB PLACEHOLDER */}
                {activeTab === "contact" && (
                    <>
                        {/* RECENT PAYEES */}
                        <Text className="text-white text-xl mt-6 mb-4 font-medium">
                            Recent Payees
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {/* Add Contact Card */}
                            <TouchableOpacity className="border border-dashed border-purple-500 rounded-2xl w-20 h-24 items-center justify-center mr-4">
                                <View className="bg-purple-600/20 p-3 rounded-full">
                                    <Ionicons name="add" size={20} color="#A855F7" />
                                </View>
                            </TouchableOpacity>

                            {/* Payees */}
                            {[
                                {
                                    name: "Kristin",
                                    amount: "$85",
                                    avatar: "https://i.pravatar.cc/150?img=5",
                                },
                                {
                                    name: "Jenny",
                                    amount: "$120",
                                    avatar: "https://i.pravatar.cc/150?img=6",
                                },
                                {
                                    name: "Robert",
                                    amount: "$64",
                                    avatar: "https://i.pravatar.cc/150?img=7",
                                },
                            ].map((user, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="bg-[#181818] flex-row items-center gap-5 rounded-2xl p-3 mr-4 items-center"
                                >
                                    <Image
                                        source={{ uri: user.avatar }}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <View>
                                        <Text className="text-white text-xs mt-2 font-medium">
                                            {user.name}
                                        </Text>
                                        <Text className="text-gray-400 text-xs">
                                            {user.amount}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* TRANSFER FORM */}
                        <Text className="text-white text-xl mt-8 mb-4 font-medium">
                            Transfer Money to
                        </Text>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            className="mt-5"
                        >
                            <View className="space-y-4">
                                <Text className="text-white mb-4">Bank Name</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="person-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Bank Name"
                                        placeholderTextColor="#666"
                                        className="text-white ml-3 flex-1 py-2"
                                    />
                                </View>

                                <Text className="text-white mb-4 mt-6">Card Number</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="card-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Card Number"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        className="text-white ml-3 flex-1 py-2"
                                    />
                                </View>

                                <Text className="text-white mb-4 mt-6">Amount</Text>
                                <View className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center" style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}>
                                    <Ionicons
                                        name="cash-outline"
                                        size={18}
                                        color="#888"
                                    />
                                    <TextInput
                                        placeholder="Enter Amount"
                                        placeholderTextColor="#666"
                                        keyboardType="numeric"
                                        className="text-white ml-3 flex-1 py-2"
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
                                        Transfer
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}