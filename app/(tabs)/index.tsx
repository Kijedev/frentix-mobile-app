import { useTransactions } from "@/app/context/TransactionContext";
import "@/app/global.css";
import ProfileHint from "@/components/ProfileHint";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../firebase";

export default function Home() {
  const [isHidden, setIsHidden] = React.useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { transactions, balance } = useTransactions();
  const [showHint, setShowHint] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setImage(savedImage);
      }
    };

    loadImage();
  }, []);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning ☀️";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon 🌤️";
    } else {
      return "Good Evening 🌙";
    }
  };

  useEffect(() => {
    const checkHint = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const hint = await AsyncStorage.getItem(
        `showProfileHint_${user.uid}`
      );

      if (hint === "true") {
        setShowHint(true);
        await AsyncStorage.removeItem(
          `showProfileHint_${user.uid}`
        );
      }
    };

    checkHint();
  }, []);

  const actions = [
    {
      label: "Add",
      icon: "add",
      route: "/Action/Add/Add",
    },
    {
      label: "Send",
      icon: "arrow-up",
      route: "/Action/Send/transfer",
    },
    {
      label: "Request",
      icon: "arrow-down",
      route: "/Action/Request/request",
    },
    {
      label: "Pay Bill",
      icon: "card",
      route: "/Action/PayBill/pay-bill",
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-[#0C0C0C]"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#722cebff", "#8c4ee9ff", "#722cebff", "#8c4ee9ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
        style={{ borderBottomLeftRadius: Platform.OS == "ios" ? 30 : 20, borderBottomRightRadius: Platform.OS == "ios" ? 30 : 20 }}
      >
        <View className="flex-row justify-between items-center pt-20 px-4">
          <View className="flex-row items-center">
            {image ? (
              <Image source={{ uri: image }} className="h-14 w-14 rounded-full border border-white" />
            ) : (
              <View className="h-14 w-14 rounded-full bg-black/10 items-center justify-center mr-3">
                <Text className="font-inter text-white font-semibold text-2xl">
                  {fullName?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View className="ml-2">
              <Text className="font-inter text-purple-200 text-md">{getGreeting()}</Text>
              <Text className="font-inter text-white text-lg font-semibold">
                {fullName ? fullName : "Welcome!"}
              </Text>
            </View>
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
          <Text className="font-inter text-purple-200 text-md">
            Available Balance
          </Text>

          <View className="flex-row items-center mt-2">
            <Text className="font-inter text-white text-4xl font-bold mr-3">
              {isHidden ? "****" : balance.toLocaleString()}
            </Text>

            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
              <Ionicons
                name={isHidden ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#E9D5FF"
              />
            </TouchableOpacity>
          </View>

          <Text className="font-inter text-purple-200 text-md mt-1">
            Updated {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Income / Expense */}
        <View className="flex-row justify-between mt-6 bg-black/10" style={{ paddingHorizontal: Platform.OS == "ios" ? 20 : 10, paddingVertical: Platform.OS == "ios" ? 15 : 10, marginVertical: Platform.OS == "ios" ? 30 : 10, marginHorizontal: Platform.OS == "ios" ? 20 : 5, borderRadius: Platform.OS == "ios" ? 50 : 50 }}>
          <View className="flex-row items-center p-2">
            <View className="bg-white/10 p-2 rounded-full mr-2">
              <Feather name="arrow-down" size={14} color="#fff" />
            </View>
            <View>
              <Text className="font-inter text-white/50 text-md">
                Income
              </Text>
              <Text className="font-inter text-white font-semibold text-xl">
                $0.00
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mr-4">
            <View className="bg-white/10 p-2 rounded-full mr-2">
              <Feather name="arrow-up" size={14} color="#fff" />
            </View>
            <View>
              <Text className="font-inter text-white/50 text-md">
                Expense
              </Text>
              <Text className="font-inter text-white font-semibold text-xl">
                $0.00
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* ACTION BUTTONS */}
      <View className="flex-row justify-between mt-8 px-4">
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
            className="bg-[#181818] py-5 rounded-2xl items-center flex-1 mx-1"
          >
            <Ionicons
              name={item.icon as any}
              size={20}
              color="#fff"
            />
            <Text className="font-inter text-white text-xs mt-2">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-8 mb-20 px-4">
        <View className="mt-6">
          <View className="flex-row justify-between items-center">
            <Text className="font-inter text-white text-lg font-semibold">
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => router.push("/Transactions/History")} className="font-inter text-purple-500 text-sm">
              <Text className="text-green-500">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            {transactions.length === 0 ? (
              <View className="bg-[#1C1C1E] p-6 rounded-2xl items-center justify-center">
                <Text className="text-gray-400 text-center">
                  Your recent transactions will appear here.
                </Text>
              </View>
            ) : (
              transactions.map((tx) => {
                const isSent = tx.type === "sent";

                return (
                  <View
                    key={tx.id}
                    className="bg-[#1C1C1E] p-4 rounded-2xl mb-3 flex-row justify-between items-center"
                  >
                    {/* Left Side */}
                    <View className="flex-row items-center">
                      <View
                        className={`p-3 rounded-full ${isSent ? "bg-red-500/15" : "bg-green-500/15"
                          }`}
                      >
                        <Ionicons
                          name={isSent ? "arrow-up" : "arrow-down"}
                          size={18}
                          color={isSent ? "#ef4444" : "#22c55e"}
                        />
                      </View>

                      <View className="ml-3">
                        <Text className="text-white font-semibold">
                          {tx.name}
                        </Text>

                        <Text className="text-gray-400 text-sm">
                          {tx.note || "Transfer"}
                        </Text>

                        <Text className="text-gray-500 text-xs mt-1">
                          {new Date(tx.date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>

                    {/* Right Side Amount */}
                    <Text
                      className={`font-semibold text-base ${isSent ? "text-red-400" : "text-green-400"
                        }`}
                    >
                      {isSent ? "-" : "+"}$
                      {tx.amount.toLocaleString()}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>

        {showHint && <ProfileHint onClose={() => setShowHint(false)} />}

        {/* Transaction Item */}
        {/* <View className="bg-[#181818] rounded-2xl p-4 mt-1 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="wallet-outline"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="font-inter text-white font-medium">
                Sarmistha | Work
              </Text>
              <Text className="font-inter text-gray-400 text-xs">
                12 Feb, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$48
          </Text>
        </View> */}

        {/* <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="cafe-outline"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="font-inter text-white font-medium">
                Mocha Coffee | Food
              </Text>
              <Text className="font-inter text-gray-400 text-xs">
                30 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-green-500 font-semibold">
            +$90
          </Text>
        </View> */}

        {/* <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="font-inter text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="font-inter text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View> */}

        {/* <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="font-inter text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="font-inter text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View> */}

        {/* <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="font-inter text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="font-inter text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View> */}
      </View>
    </ScrollView>
  );
}