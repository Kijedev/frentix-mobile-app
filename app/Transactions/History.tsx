import { useTransactions } from "@/app/context/TransactionContext";
import BackBtn from "@/components/BackBtn";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
    const { transactions } = useTransactions();
    return (
        <SafeAreaView className="bg-[#0C0C0C] flex-1">
            <ScrollView>
                <View>
                    <View className='flex-row items-center px-4'>
                        <BackBtn />
                        <Text className='text-white font-inter mt-3 ml-6 text-2xl font-semibold'>Transactions History</Text>
                    </View>
                </View>

                <View className="mt-4 px-4">
                    {transactions.length === 0 ? (
                        <View className="bg-[#1C1C1E] p-6 rounded-2xl items-center justify-center">
                            <Text className="text-gray-400 text-center">
                                Your recent transactions will appear here.
                            </Text>
                        </View>
                    ) : (
                        transactions.map((tx) => {
                            const isSent = tx.type === "sent";

                            return (
                                <View
                                    key={tx.id}
                                    className="bg-[#1C1C1E] p-4 rounded-2xl mb-3 flex-row justify-between items-center"
                                >
                                    {/* Left Side */}
                                    <View className="flex-row items-center">
                                        <View
                                            className={`p-3 rounded-full ${isSent ? "bg-red-500/15" : "bg-green-500/15"
                                                }`}
                                        >
                                            <Ionicons
                                                name={isSent ? "arrow-up" : "arrow-down"}
                                                size={18}
                                                color={isSent ? "#ef4444" : "#22c55e"}
                                            />
                                        </View>

                                        <View className="ml-3">
                                            <Text className="text-white font-semibold">
                                                {tx.name}
                                            </Text>

                                            <Text className="text-gray-400 text-sm">
                                                {tx.note || "Transfer"}
                                            </Text>

                                            <Text className="text-gray-500 text-xs mt-1">
                                                {new Date(tx.date).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Right Side Amount */}
                                    <Text
                                        className={`font-semibold text-base ${isSent ? "text-red-400" : "text-green-400"
                                            }`}
                                    >
                                        {isSent ? "-" : "+"}$
                                        {tx.amount.toLocaleString()}
                                    </Text>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default History