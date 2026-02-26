import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type AlertType = "success" | "info" | "error" | "warning";

interface AppAlertProps {
    visible: boolean;
    type?: AlertType;
    title: string;
    message: string;
    onClose: () => void;
}

export default function AppAlert({
    visible,
    type = "info",
    title,
    message,
    onClose,
}: AppAlertProps) {
    const getIcon = () => {
        switch (type) {
            case "success":
                return <Ionicons name="checkmark-circle-outline" size={40} color="#22c55e" />;
            case "error":
                return <Ionicons name="close-circle-outline" size={40} color="#ef4444" />;
            case "warning":
                return <Ionicons name="alert-circle-outline" size={40} color="#f59e0b" />;
            default:
                return <Ionicons name="information-circle-outline" size={40} color="#3b82f6" />;
        }
    };

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <View className="bg-[#0A0A0A] rounded-2xl p-6 w-full max-w-sm">
                    <View className="items-center mb-4">{getIcon()}</View>
                    <Text className="text-white font-inter text-xl font-semibold text-center mb-2">
                        {title}
                    </Text>
                    <Text className="text-gray-400 font-inter text-center mb-6">{message}</Text>

                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.8}
                        className="bg-[#8c4ee9ff] py-3 rounded-xl mt-10"
                    >
                        <Text className="text-white font-inter text-center font-semibold text-base">
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}