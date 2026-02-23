import { auth } from "@/app/firebase";
import "@/app/global.css";
import { sendEmailVerification } from "@/app/Verification/sendEmailVerification";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert, Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [secureText, setSecureText] = useState(true);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setAuthError("");

    let valid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Send email verification
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        Alert.alert(
          "Verification Email Sent",
          "Check your email and verify your account before logging in."
        );

        // Sign out the user so they go to login page
        await signOut(auth);
      }

      router.replace("/(auth)/login"); // Now it will go to login
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email is already registered");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email format");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password is too weak");
      } else {
        setAuthError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="mt-5"
        >
          <View>
            <Text className="text-white mb-4">Email Address</Text>
            <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
              <Feather name="mail" size={18} color="#fff" />
              <TextInput
                placeholder="Enter Your Email"
                onChangeText={setEmail}
                value={email}
                placeholderTextColor="#fff"
                className="flex-1 text-white ml-3"
              />
            </View>
            {emailError ? (
              <Text className="text-red-500 mt-2 text-sm">
                {emailError}
              </Text>
            ) : null}
          </View>

          <Text className="text-white mb-4 mt-5">Password</Text>
          <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
            <Feather name="lock" size={18} color="#fff" />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#fff"
              onChangeText={setPassword}
              value={password}
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
          {passwordError ? (
            <Text className="text-red-500 mt-2 text-sm">
              {passwordError}
            </Text>
          ) : null}
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

        {authError ? (
          <Text className="text-red-500 text-center mt-4">
            {authError}
          </Text>
        ) : null}
        <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} className="mt-10">
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
              {loading ? "Signing up..." : "Sign up"}
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
    </SafeAreaView >
  );
};

export default Register;