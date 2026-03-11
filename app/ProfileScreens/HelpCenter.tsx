import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "@/components/BackBtn";
import { Ionicons } from "@expo/vector-icons";

const faqs = [
  {
    question: "How do I add a new card?",
    answer:
      "Click on the Send Button on the Home page, tap 'Add Bank Card', enter your card details, and click add.",
  },
  {
    question: "How do I transfer money?",
    answer:
      "Select a recipient from your recent payees or add a new bank account, enter the amount, and confirm the transfer.",
  },
  {
    question: "What should I do if a transaction fails?",
    answer:
      "Check your internet connection, ensure your card has sufficient funds, and retry the transaction. Contact support if the issue persists.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to us via the 'Contact Support' button below or email support@frentix.com.",
  },
];

const HelpCenter = () => {
  return (
    <SafeAreaView className="bg-[#0C0C0C] flex-1">
      <View className="flex-row items-center px-4">
        <BackBtn />
        <Text className="text-white font-inter ml-6 mt-3 text-2xl font-semibold">
          Help Center
        </Text>
      </View>

      {/* Description */}
      <View className="px-4 mt-6">
        <Text className="text-white/60 font-inter text-base">
          Find answers to common questions or contact our support team.
        </Text>
      </View>

      {/* FAQ List */}
      <ScrollView className="px-4 mt-6">
        {faqs.map((faq, index) => (
          <View
            key={index}
            className="bg-[#181818] rounded-xl p-4 mb-4 border border-[#2A2A2A]"
          >
            <Text className="text-white font-inter text-lg font-semibold">
              {faq.question}
            </Text>
            <Text className="text-gray-400 mt-2 font-inter">{faq.answer}</Text>
          </View>
        ))}

        <TouchableOpacity
          className="bg-[#7C3AED] mt-6 py-4 rounded-xl items-center flex-row justify-center"
          activeOpacity={0.8}
          onPress={() => {
            console.log("Contact support pressed");
          }}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
          <Text className="text-white font-inter font-semibold text-base ml-2">
            Contact Support
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenter;