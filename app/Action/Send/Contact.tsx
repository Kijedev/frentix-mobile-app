import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Card = {
    name: string;
    number: string;
    color: string;
};

type Bank = {
    name: string;
    slug: string;
};

const Contact = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState("");
    const [showBanks, setShowBanks] = useState(false);
    const [bankLogo, setBankLogo] = useState<string>("");

    return (
            <>
                <Text className="font-inter text-white text-xl mt-6 mb-4 font-medium">
                    Recent Payees
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity className="border border-dashed border-purple-500 rounded-2xl w-32 h-28 items-center justify-center mr-4">
                        <View className="bg-purple-600/20 p-3 rounded-full">
                            <Ionicons name="add" size={20} color="#A855F7" />
                        </View>
                    </TouchableOpacity>

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
                                <Text className="font-inter text-white text-xs mt-2 font-medium">
                                    {user.name}
                                </Text>
                                <Text className="font-inter text-gray-400 text-xs">
                                    {user.amount}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text className="font-inter text-white text-xl mt-8 mb-4 font-medium">
                    Transfer Money to
                </Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="mt-5"
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="font-inter text-white mb-4">Bank Name</Text>
                            {/* Bank dropdown button */}
                            <TouchableOpacity
                                onPress={() => setShowBanks(!showBanks)}
                                className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center"
                                style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}
                            >
                                <Ionicons name="business-outline" size={18} color="#888" />
                                <Text className="text-white ml-3 flex-1">{selectedBank || "Select Bank"}</Text>
                            </TouchableOpacity>

                            {showBanks && (
                                <View
                                    className="bg-[#0C0C0C] rounded-xl mt-2 absolute z-50 top-[90%] w-full"
                                    style={{ maxHeight: 200 }}
                                >
                                    <ScrollView showsVerticalScrollIndicator={true}>
                                        {banks.map((bank, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    setSelectedBank(bank.name);
                                                    setBankLogo(
                                                        `https://supermx1.github.io/nigerian-banks-api/logos/${bank.slug}.png`
                                                    );
                                                    setShowBanks(false);
                                                }}
                                                className="px-4 py-3 border-b border-[#2A2A2A] flex-row items-center bg-[#181818]"
                                            >
                                                <Image
                                                    source={{
                                                        uri: `https://supermx1.github.io/nigerian-banks-api/logos/${bank.slug}.png`,
                                                    }}
                                                    className="w-8 h-8 mr-3"
                                                    resizeMode="contain"
                                                />
                                                <Text className="text-white">{bank.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        <Text className="font-inter text-white mb-4 mt-6">Card Number</Text>
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

                        <Text className="font-inter text-white mb-4 mt-6">Amount</Text>
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
                            <Text className="font-inter text-white text-center font-semibold text-base">
                                Transfer
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </>
    )
}

export default Contact