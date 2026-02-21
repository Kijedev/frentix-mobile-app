import '@/app/global.css';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex items-center mt-10 gap-4'>
        <Text className='text-white text-5xl font-bold'>Get Started</Text>
        <Text className='text-white text-2xl font-bold text-[#555] font-light max-w-xs text-center'>Best way to Manage your Finances.</Text>
      </View>
    </SafeAreaView>
  )
}

export default index