import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "@/app/global.css";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Get Started!",
    subtitle: "Best Way to Manage Your Finances.",
    image: require("@/assets/images/wallet.png"), 
  },
  {
    id: "2",
    title: "Track Expenses",
    subtitle: "Monitor where your money goes.",
    image: require("@/assets/images/cardholding.png"),
  },
  {
    id: "3",
    title: "Secure Payments",
    subtitle: "Fast and safe transactions anytime.",
    image: require("@/assets/images/atmcard.png"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1 bg-black justify-between">
      <StatusBar style="light" />

      {/* SLIDER */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View
            style={{ width }}
            className="items-center justify-center px-6"
          >
            <Text className="text-white text-5xl font-bold mt-10 text-center">
              {item.title}
            </Text>

            <Text className="text-gray-400 text-center text-xl max-w-xs mt-3 text-base">
              {item.subtitle}
            </Text>

            <Image
              source={item.image}
              resizeMode="contain"
              className="w-96 h-96 mt-12"
            />
          </View>
        )}
      />

      {/* BOTTOM SECTION */}
      <View className="px-6 mb-12">

        {/* DOTS */}
        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                currentIndex === index
                  ? "w-6 bg-purple-500"
                  : "w-2 bg-gray-600"
              }`}
            />
          ))}
        </View>

        {/* SIGN UP BUTTON (GRADIENT) */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          activeOpacity={0.8}
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
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* LOG IN BUTTON (OUTLINE) */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="border border-purple-500 rounded-xl py-4 mt-4"
        >
          <Text className="text-white text-center font-medium">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}