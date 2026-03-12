import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useNotifications } from "@/app/context/NotificationContext";
import { router } from "expo-router";

export const NotifyBell = () => {
  const navigation = useNavigation();
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <TouchableOpacity
      className="relative p-2"
      onPress={() => router.push("@/c")} // Navigate to notifications page
    >
      <Ionicons name="notifications-outline" size={24} color="#fff" />

      {/* Red dot for unread notifications */}
      {unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
      )}
    </TouchableOpacity>
  );
};