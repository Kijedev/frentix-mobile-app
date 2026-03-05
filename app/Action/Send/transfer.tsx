import BackBtn from "@/components/BackBtn";
import React, { useState } from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Contact from "@/app/Action/Send/Contact";
import BankTab from "@/app/Action/Send/Bank";

const { width } = Dimensions.get("window");

type Card = {
    name: string;
    number: string;
    color: string;
};

type Bank = {
    name: string;
    slug: string;
};


export default function Transfer() {
    const [activeTab, setActiveTab] = useState<"bank" | "contact">("bank");

    return (
        <SafeAreaView className="flex-1 bg-[#0C0C0C]">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                className="px-5"
            >
                <View className="flex-row items-center justify-between mt-4">
                    <BackBtn />
                    <Text className="font-inter text-white text-lg font-semibold">
                        Transfer
                    </Text>
                    <View className="w-10" />
                </View>

                <View className="flex-row bg-[#141414] rounded-full p-1 mt-6">
                    <TouchableOpacity
                        onPress={() => setActiveTab("bank")}
                        className={`font-inter flex-1 py-3 rounded-full items-center ${activeTab === "bank" ? "bg-purple-600" : ""
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
                        className={`font-inter flex-1 py-3 rounded-full items-center ${activeTab === "contact" ? "bg-purple-600" : ""
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

                {activeTab === "bank" && (
                    <BankTab />
                )}

                {activeTab === "contact" && (
                    <Contact />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}