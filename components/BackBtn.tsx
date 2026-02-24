import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const BackBtn = () => {
    return (
        <TouchableOpacity
            onPress={() => router.back()}
            className="bg-[#181818] rounded-full items-center justify-center h-12 w-12 mt-4"
        >
            <Text className="text-white text-2xl font-light">←</Text>
        </TouchableOpacity>
    );
};

export default BackBtn;