import BackBtn from '@/components/BackBtn'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PaymentType = () => {
    return (
        <SafeAreaView className='flex-1 bg-[#0A0A0A] px-6'>
            <View className='flex-row items-center gap-4'>
                <BackBtn />
                <Text className='text-white text-2xl mt-5 font-bold'>Select Payment Type</Text>
            </View>

            <View className='mt-10'>
                <Text className='text-white text-2xl font-inter'>Payment Type</Text>
                <Text className='text-white/40 mt-3'>Depositing Significantly high amounts?</Text>
            </View>

            <View>
                <Text className='text-white text-xl font-inter mt-10'>Popular Payment Methods</Text>
                <View className='mt-5'>
                    <TouchableOpacity
                        className="bg-[#8c4ee9ff] rounded-2xl p-4 mb-4 flex-row justify-between items-center"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-white/10 p-3 rounded-full mr-3">
                                <Ionicons
                                    size={18}
                                    color="#fff"
                                    name="wallet-outline"
                                />
                            </View>
                            <Text className="font-inter text-xl text-white">
                                Direct Bank Transfer
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#fff"
                            className='bg-[#8c4ee9ff]/80 border border-white/10 p-2 rounded-full'
                        />
                    </TouchableOpacity>
                </View>

                <View className='mt-5'>
                    <TouchableOpacity
                        className="bg-[#8c4ee9ff] rounded-2xl p-4 mb-4 flex-row justify-between items-center"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-white/10 p-3 rounded-full mr-3">
                                <Ionicons
                                    size={18}
                                    color="#fff"
                                    name="wallet-outline"
                                />
                            </View>
                            <Text className="font-inter text-xl text-white">
                                NGN Debit/Credit Card
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#fff"
                            className='bg-[#8c4ee9ff]/80 border border-white/10 p-2 rounded-full'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentType

const styles = StyleSheet.create({})