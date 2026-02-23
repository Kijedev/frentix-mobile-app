import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { signOut } from "firebase/auth"
import { Alert } from 'react-native'
import React from 'react'
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { auth } from "../firebase"

const Profile = () => {
  const profiles = [
    {
      name: "My Account",
      icon: "person-outline",
      screen: "/(tabs)/Profile",
    },
    {
      name: "My Cards",
      icon: "card-outline",
      screen: "/(tabs)/Cards",
    },
    {
      name: "Settings",
      icon: "settings-outline",
      screen: "/(tabs)/Settings",
    },
    {
      name: "Change Password",
      icon: "lock-closed-outline",
      screen: "/(tabs)/ChangePassword",
    },
    {
      name: "Help Center",
      icon: "help-circle-outline",
      screen: "/(tabs)/HelpCenter",
    },
  ]

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await signOut(auth);
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };


  return (
    <ScrollView className="flex-1 bg-[#0C0C0C]">
      <LinearGradient
        colors={["#8437F9", "#7C3AED", "#8437F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
        style={{ borderBottomLeftRadius: Platform.OS == "ios" ? 30 : 20, borderBottomRightRadius: Platform.OS == "ios" ? 30 : 20 }}
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-center pt-20 px-5">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="bg-white/20 rounded-full items-center justify-center h-12 w-12 mt-4"
          >
            <Text className="text-white text-2xl font-light">←</Text>
          </TouchableOpacity>

          <View>
            <Text className="text-white text-2xl font-semibold">Profile</Text>
          </View>

          <TouchableOpacity className="bg-white/20 p-3 rounded-full">
            <Ionicons
              name="notifications-outline"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View className="mt-6 items-center">
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=3",
            }}
            className="h-32 w-32 rounded-full mr-3"
          />
          <View className='mt-5 pb-10'>
            <Text className="text-white text-2xl font-semibold text-center">
              Balla Daniella
            </Text>
            <Text className="text-white/80 font-light text-center">
              balladaniella@gmail.com
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

              <Text className="text-white font-medium">
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

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-[#181818] rounded-2xl p-4 mb-4 flex-row justify-between items-center pb-20"
      >
        <View className="flex-row items-center">
          <View className="bg-white/10 p-3 rounded-full mr-3">
            <Ionicons
              size={18}
              color="#fff"
              name="log-out-outline"
            />
          </View>

          <Text className="text-white font-medium">
            Log out
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
          className='bg-[#181818]/80 border border-white/5 p-2 rounded-full'
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Profile