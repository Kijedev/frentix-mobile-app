import "@/app/global.css";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [isHidden, setIsHidden] = React.useState(true);
  return (
    <ScrollView
      className="flex-1 bg-[#0C0C0C]"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#8437F9", "#7C3AED", "#8437F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
        style={{ borderBottomLeftRadius: Platform.OS == "ios" ? 30 : 20, borderBottomRightRadius: Platform.OS == "ios" ? 30 : 20 }}
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-center pt-20 px-5">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=3",
              }}
              className="h-10 w-10 rounded-full mr-3"
            />
            <View>
              <Text className="text-purple-200 text-xs">
                Welcome Back
              </Text>
              <Text className="text-white font-semibold">
                Balla Daniella
              </Text>
            </View>
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
          <Text className="text-purple-200 text-md">
            Available Balance
          </Text>

          {/* Amount + Eye */}
          <View className="flex-row items-center mt-2">
            <Text className="text-white text-4xl font-bold mr-3">
              {isHidden ? "********" : "$25,415.25"}
            </Text>

            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
              <Ionicons
                name={isHidden ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#E9D5FF"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-purple-200 text-md mt-1">
            Updated 9/30/2025
          </Text>
        </View>

        {/* Income / Expense */}
        <View className="flex-row justify-between mt-6 bg-white/10" style={{ paddingHorizontal: Platform.OS == "ios" ? 20 : 10, paddingVertical: Platform.OS == "ios" ? 15 : 10, marginVertical: Platform.OS == "ios" ? 30 : 10, marginHorizontal: Platform.OS == "ios" ? 20 : 5, borderRadius: Platform.OS == "ios" ? 50 : 50 }}>
          <View className="flex-row items-center p-2">
            <View className="bg-white/20 p-2 rounded-full mr-2">
              <Feather name="arrow-down" size={14} color="#fff" />
            </View>
            <View>
              <Text className="text-purple-200 text-md">
                Income
              </Text>
              <Text className="text-white font-semibold text-xl">
                $90,530
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-white/20 p-2 rounded-full mr-2">
              <Feather name="arrow-up" size={14} color="#fff" />
            </View>
            <View>
              <Text className="text-purple-200 text-md">
                Expense
              </Text>
              <Text className="text-white font-semibold text-xl">
                $15,256
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* ACTION BUTTONS */}
      <View className="flex-row justify-between mt-8 px-4">
        {["Add", "Send", "Request", "Pay Bill"].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#181818] p-4 rounded-2xl items-center flex-1 mx-1"
            >
              <Ionicons
                name={
                  index === 0
                    ? "add"
                    : index === 1
                      ? "arrow-up"
                      : index === 2
                        ? "arrow-down"
                        : "card"
                }
                size={20}
                color="#fff"
              />
              <Text className="text-white text-xs mt-2">
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* RECENT TRANSACTIONS */}
      <View className="mt-8 mb-10 px-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-semibold">
            Recent Transactions
          </Text>
          <Text className="text-purple-500 text-sm">
            See All
          </Text>
        </View>

        {/* Transaction Item */}
        <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="wallet-outline"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="text-white font-medium">
                Sarmistha | Work
              </Text>
              <Text className="text-gray-400 text-xs">
                12 Feb, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$48
          </Text>
        </View>

        <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="cafe-outline"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="text-white font-medium">
                Mocha Coffee | Food
              </Text>
              <Text className="text-gray-400 text-xs">
                30 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-green-500 font-semibold">
            +$90
          </Text>
        </View>

        <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View>

        <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View>

        <View className="bg-[#181818] rounded-2xl p-4 mt-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/10 p-3 rounded-full mr-3">
              <Ionicons
                name="logo-amazon"
                size={18}
                color="#fff"
              />
            </View>
            <View>
              <Text className="text-white font-medium">
                Amazon | Subscription
              </Text>
              <Text className="text-gray-400 text-xs">
                28 Jan, 2025
              </Text>
            </View>
          </View>
          <Text className="text-red-500 font-semibold">
            -$20
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}