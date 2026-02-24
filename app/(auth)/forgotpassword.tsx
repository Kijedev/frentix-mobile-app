import { auth } from "@/app/firebase";
import "@/app/global.css";
import BackBtn from "@/components/BackBtn";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const forgotpassword = () => {
    const [secureText, setSecureText] = useState(true);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        setEmailError("");
        setSuccessMessage("");

        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!email.includes("@")) {
            setEmailError("Please enter a valid email");
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email.trim());

            setSuccessMessage("Password reset link sent to your email.");
        } catch (error: any) {
            setEmailError("No account found with this email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#0A0A0A] px-6">
            <BackBtn />

            <View className="items-center mt-10">
                <Text className="font-inter text-white text-4xl font-bold">
                    Forgot Password?
                </Text>
                <Text className="font-inter text-gray-400 text-center mt-3 text-lg max-w-xs">
                    Don't worry! enter your email address, we'll send you reset instructions.
                </Text>
            </View>

            <View className="mt-5 space-y-6">
                {successMessage ? (
                    <Text className="text-green-500 text-center mt-4">
                        {successMessage}
                    </Text>
                ) : null}
                <View className="mt-5">
                    <Text className="font-inter text-white mb-4">Email Address</Text>
                    <View className="flex-row items-center bg-[#181818] rounded-xl px-4 py-5">
                        <Feather name="mail" size={18} color="#fff" />
                        <TextInput
                            placeholder="Enter Your Email"
                            placeholderTextColor="#fff"
                            className="flex-1 text-white ml-3"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {emailError ? (
                        <Text className="text-red-500 mt-2 text-sm">
                            {emailError}
                        </Text>
                    ) : null}
                </View>

                <TouchableOpacity
                    onPress={handleResetPassword}
                    activeOpacity={0.8}
                    disabled={loading}
                    className={`mt-10 ${loading ? "opacity-50" : ""}`}
                >
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
                            {loading ? "Sending..." : "Send"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default forgotpassword;