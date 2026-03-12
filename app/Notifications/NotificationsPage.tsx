import { useNotifications } from "@/app/context/NotificationContext";
import BackBtn from "@/components/BackBtn";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsPage() {
  const { notifications, markAllRead } = useNotifications();

  // Mark all notifications as read when the page opens
  useEffect(() => {
    markAllRead();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A] p-4">
      <View className="flex-row items-center gap-4">
        <BackBtn />
        <Text className="text-white text-2xl font-bold mt-4">Notifications</Text>
      </View>

      <View className="mt-6">
        {notifications.length === 0 ? (
          <Text className="text-white/50 text-center mt-8">
            No notifications yet
          </Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className={`p-4 mb-2 rounded ${item.read ? "bg-[#181818]" : "bg-[#181818]"
                  }`}
              >
                <Text className="text-white text-xl font-semibold">{item.title}</Text>
                <Text className="mt-1 text-white/70 text-sm">{item.body}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}