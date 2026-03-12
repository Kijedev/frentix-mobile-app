import { useNotifications } from "@/app/context/NotificationContext";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "../BackBtn";

export default function NotificationsPage() {
    const { notifications, markAllRead } = useNotifications();

    // Mark all notifications as read when the page opens
    useEffect(() => {
        markAllRead();
    }, []);

    return (
        <SafeAreaView>
            <Text className="text-white text-xl font-bold mb-4">Notifications</Text>
            <BackBtn />

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
                            className={`p-4 mb-2 rounded ${item.read ? "bg-gray-800" : "bg-purple-700"
                                }`}
                        >
                            <Text className="text-white font-semibold">{item.title}</Text>
                            <Text className="text-white/70">{item.body}</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}