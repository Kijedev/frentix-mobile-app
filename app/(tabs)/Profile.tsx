import ProfileAvatar from '@/components/ProfileAvatar'
import AppAlert from '@/components/ui/Alert'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { signOut } from "firebase/auth"
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { auth } from "../firebase"

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const [confirmText, setConfirmText] = useState("");
  const [cancelText, setCancelText] = useState("");

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

  const handleLogout = () => {
    setAlertTitle("Logout");
    setAlertMessage("Are you sure you want to logout?");
    setAlertType("warning");
    setAlertVisible(true);
  };

  const profiles = [
    {
      name: "My Account",
      icon: "person-outline",
      screen: "/ProfileScreens/AccountScreen",
    },
    {
      name: "My Cards",
      icon: "card-outline",
      screen: "/ProfileScreens/Cards",
    },
    {
      name: "Settings",
      icon: "settings-outline",
      screen: "/ProfileScreens/Settings",
    },
    {
      name: "Change Password",
      icon: "lock-closed-outline",
      screen: "/ProfileScreens/ChangePassword",
    },
    {
      name: "Help Center",
      icon: "help-circle-outline",
      screen: "/ProfileScreens/HelpCenter",
    },
  ]

  return (
    <ScrollView className="flex-1 bg-[#0C0C0C]">
      <LinearGradient
        colors={["#722cebff", "#8c4ee9ff", "#722cebff", "#8c4ee9ff", "#8437F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
        style={{ borderBottomLeftRadius: Platform.OS == "ios" ? 30 : 20, borderBottomRightRadius: Platform.OS == "ios" ? 30 : 20 }}
      >
        <View className="flex-row justify-between items-center pt-20 px-5">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/10 rounded-full items-center justify-center h-12 w-12 mt-4"
          >
            <Text className="text-white text-2xl font-light">←</Text>
          </TouchableOpacity>

          <View>
            <Text className="font-inter text-white text-2xl font-semibold">Profile</Text>
          </View>

          <TouchableOpacity className="bg-black/10 p-3 rounded-full">
            <Ionicons
              name="notifications-outline"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View className="mt-6 items-center">
          <ProfileAvatar fullName={fullName} />
          <View className='mt-5 pb-10'>
            <Text className="font-inter text-white text-2xl font-semibold text-center">
              {fullName ? fullName : "Welcome!"}
            </Text>
            <Text className="font-inter text-white/50 text-center">
              {email ? email : "Welcome!"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View className="mt-6 px-4">
        {profiles.map((profile, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(profile.screen as any)}
            className="bg-[#181818] rounded-2xl p-4 mb-4 flex-row justify-between items-center"
          >
            <View className="flex-row items-center">
              <View className="bg-white/10 p-3 rounded-full mr-3">
                <Ionicons
                  name={profile.icon as any}
                  size={18}
                  color="#fff"
                />
              </View>

              <Text className="font-inter text-white">
                {profile.name}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#888"
              className='bg-[#181818]/80 border border-white/5 p-2 rounded-full'
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-[#181818] rounded-2xl p-4 ml-4 mr-4 mb-20 flex-row justify-between items-center"
      >
        <View className="flex-row items-center">
          <View className="bg-white/10 p-3 rounded-full mr-3">
            <Ionicons
              name='log-out-outline'
              size={18}
              color="#fff"
            />
          </View>

          <Text className="font-inter text-white">
            Logout
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          className='bg-[#181818]/80 border border-white/5 p-2 rounded-full'
        />
      </TouchableOpacity>


      <AppAlert
        visible={alertVisible}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setAlertVisible(false)}
        onConfirm={async () => {
          setAlertVisible(false);
          await signOut(auth);
          router.replace("/(auth)/login");
        }}
      />
    </ScrollView>
  )
}

export default Profile