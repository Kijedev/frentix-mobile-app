import BackBtn from '@/components/BackBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const loadName = async () => {
      const name = await AsyncStorage.getItem("userFullName");
      if (name) setFullName(name);
    };
    loadName();
  }, []);

  useEffect(() => {
    const loadEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) setEmail(email);
    };
    loadEmail();
  }, []);

  const handleDelete = () => {
    Alert.alert('Are you sure?', 'This action cannot be undone', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ])
  }

  return (
    <SafeAreaView className='bg-[#0C0C0C] flex-1'>
      <View className='flex-row items-center px-4'>
        <BackBtn />
        <Text className='text-white font-inter mt-3 ml-6 text-2xl font-semibold'>Account Details</Text>
      </View>

      <View className='px-4 mt-10'>
        <Text className='text-white font-inter text-xl font-semibold'>Profile</Text>

        <Text className='text-white/50 font-inter text-md mt-5'>Name</Text>
        <Text className='text-white font-inter mt-2 text-xl'>
          {fullname}
        </Text>

        <View className='bg-white/10 h-px w-full mt-5' />

        <Text className='text-white/50 font-inter text-md mt-5'>Email</Text>
        <Text className='text-white font-inter mt-2 text-xl'>
          {email}
        </Text>
        <View className='bg-white/10 h-px w-full mt-5' />
      </View>

      <TouchableOpacity onPress={handleDelete} className='px-4 mt-5'>
        <Text className='text-red-600 font-inter text-xl'>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AccountScreen