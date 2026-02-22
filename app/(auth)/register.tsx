import "@/app/global.css";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  const [secureText, setSecureText] = useState(true);
  const [remember, setRemember] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A] px-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/(onboarding)")}
        className="bg-[#181818] rounded-full items-center justify-center h-12 w-12 mt-4"
      >
        <Text className="text-white text-2xl font-light">←</Text>
      </TouchableOpacity>

      <View className="items-center mt-10">
        <Text className="text-white text-4xl font-bold">
          Create Your Account
        </Text>
        <Text className="text-gray-400 text-center mt-3 text-lg">
          Best Way To Manage{"\n"}Your Finances.
        </Text>
      </View>

      <View className="mt-5 space-y-6">
        <View>
          <Text className="text-white mb-4">Full Name</Text>
          <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
            <Feather name="user" size={18} color="#fff" />
            <TextInput
              placeholder="Enter Your Full Name"
              placeholderTextColor="#fff"
              className="flex-1 text-white ml-3"
            />
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-white mb-4">Email Address</Text>
          <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
            <Feather name="mail" size={18} color="#fff" />
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor="#fff"
              className="flex-1 text-white ml-3"
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="mt-5"
        >
          <Text className="text-white mb-4">Password</Text>
          <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
            <Feather name="lock" size={18} color="#fff" />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#fff"
              secureTextEntry={secureText}
              className="flex-1 text-white ml-3"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View className="flex-row justify-between items-center mt-5">
          <TouchableOpacity
            onPress={() => setRemember(!remember)}
            className="flex-row items-center"
          >
            <View
              className={`h-5 w-5 rounded-full border mr-2 items-center justify-center ${remember ? "border-purple-500" : "border-gray-600"
                }`}
            >
              {remember && (
                <View className="h-2 w-2 bg-purple-500 rounded-full" />
              )}
            </View>
            <Text className="text-gray-400">I agree to the <Text className="text-[#8538FD] font-medium underline">Terms and conditions</Text></Text>
          </TouchableOpacity>
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
              Log In
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-800" />
          <Text className="text-gray-500 mx-3 text-sm">
            Or Continue With
          </Text>
          <View className="flex-1 h-[1px] bg-gray-800" />
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 border border-gray-800 rounded-xl py-4 items-center mr-3 flex-row justify-center">
            {/* <Ionicons name="logo-google" size={18} color="#fff" /> */}
            <Image
              source={require("@/assets/images/google.png")}
              className="w-6 h-6"
            />
            <Text className="text-white ml-2">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 border border-gray-800 rounded-xl py-4 items-center ml-3 flex-row justify-center">
            {/* <Ionicons name="logo-apple" size={18} color="#fff" /> */}
            <Image
              source={require("@/assets/images/apple.png")}
              className="w-8 h-8"
            />
            <Text className="text-white ml-2">Apple</Text>
          </TouchableOpacity>

        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-400">
            Have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text className="text-purple-500 font-medium">
              Login
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default register;