import BackBtn from '@/components/BackBtn'
import AppAlert from "@/components/ui/Alert"
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { deleteUser, getAuth } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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

  const handleDeleteAccount = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      // delete user from firebase auth
      await deleteUser(user);

      // clear local storage
      await AsyncStorage.clear();

      // close alert
      setShowDeleteAlert(false);

      // redirect to login
      router.replace("/login");

    } catch (error: any) {
      console.log("Delete account error:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("Please log out and log in again before deleting your account.");
      }
    }
  };

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

      <TouchableOpacity
        onPress={() => setShowDeleteAlert(true)}
        className="bg-red-500/10 mx-4 py-4 px-4 rounded-xl flex-row items-center justify-center mt-6"
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
        <Text className="text-red-500 font-inter ml-2">Delete Account</Text>
      </TouchableOpacity>

      <AppAlert
        visible={showDeleteAlert}
        type="warning"
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Delete"
        onCancel={() => setShowDeleteAlert(false)}
        onConfirm={handleDeleteAccount}
      />
    </SafeAreaView>
  )
}


export default AccountScreen