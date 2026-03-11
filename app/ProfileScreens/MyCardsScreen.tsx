import PatternImage from "@/assets/images/pattern.png";
import BackBtn from "@/components/BackBtn";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";

type Card = {
  id: string;
  name: string;
  number: string;
  gradient: [string, string];
};

type Bank = {
  id: string;
  order: number;
  title: string;
  categories: string[];
  route: string;
  url: string;
  ticker: string;
};

const AccountScreen = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);

  /* ---------------- MASK CARD NUMBER ---------------- */

  const maskCard = (num: string) => {
    return "**** **** **** " + num.slice(-4);
  };

  /* ---------------- LOAD SAVED CARDS ---------------- */

  useEffect(() => {
    const loadCards = async () => {
      try {
        const storedCards = await AsyncStorage.getItem("user_cards");

        if (storedCards) {
          setCards(JSON.parse(storedCards));
        }
      } catch (error) {
        console.log("Error loading cards:", error);
      }
    };

    loadCards();
  }, []);

  /* ---------------- FETCH BANKS ---------------- */

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://api.nigerianbanklogos.xyz");
        const data: Bank[] = await response.json();
        setBanks(data);
      } catch (error) {
        console.log("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  /* ---------------- DELETE CARD ---------------- */

  const deleteCard = async (id: string) => {
    const filteredCards = cards.filter((card) => card.id !== id);

    setCards(filteredCards);

    await AsyncStorage.setItem("user_cards", JSON.stringify(filteredCards));
  };

  return (
    <SafeAreaView className="bg-[#0C0C0C] flex-1">
      <View className="flex-row items-center px-4">
        <BackBtn />
        <Text className="text-white font-inter mt-3 ml-6 text-2xl font-semibold">
          Saved Cards
        </Text>
      </View>

      <View className="px-4 mt-10">
        <Text className="text-white/60 font-inter text-xl">
          You can manage all your cards here.
        </Text>
      </View>

      <ScrollView className="px-4 mt-6">
        {cards.map((item) => {
          const bank = banks.find((b) => b.title === item.name);

          return (
            <LinearGradient
              key={item.id}
              colors={item.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 20,
                marginBottom: 20,
                height: 200
              }}
            >
              <ImageBackground
                source={PatternImage}
                imageStyle={{ borderRadius: 20, opacity: 0.4 }}
                style={{ padding: 20, height: 200 }}
              >
                {/* Bank Info */}
                <View className="flex-row items-center gap-3">
                  {bank && (
                    <SvgUri height={32} width={32} uri={bank.route} />
                  )}

                  <Text className="text-white font-inter text-xl font-bold">
                    {item.name}
                  </Text>
                </View>

                {/* Card Number */}
                <Text className="absolute bottom-5 left-5 text-white font-inter font-semibold mt-6 text-lg">
                  {maskCard(item.number)}
                </Text>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => deleteCard(item.id)}
                  className="absolute right-4 top-4 bg-red-500/80 p-2 rounded-full"
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </LinearGradient>
          );
        })}

        {cards.length === 0 && (
          <View className="mt-20 items-center">
            <Text className="text-white/60 text-lg">
              No saved cards yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;