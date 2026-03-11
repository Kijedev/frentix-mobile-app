import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "@/components/BackBtn";

const termsText = [
  {
    title: "1. Introduction",
    content:
      "Welcome to our app. By using our services, you agree to comply with and be bound by these terms and conditions.",
  },
  {
    title: "2. User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account information and for all activities under your account.",
  },
  {
    title: "3. Payments and Transactions",
    content:
      "All financial transactions made through the app are your responsibility. Ensure your account has sufficient funds before initiating transactions.",
  },
  {
    title: "4. Privacy",
    content:
      "We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.",
  },
  {
    title: "5. Restrictions",
    content:
      "You may not use the app for any unlawful activities, including fraud, money laundering, or unauthorized access to other accounts.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of the app.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We may update these terms at any time. Continued use of the app constitutes acceptance of the updated terms.",
  },
  {
    title: "8. Contact Us",
    content:
      "For any questions regarding these terms, please contact our support team via the Help Center.",
  },
];

const TermsAndConditions = () => {
  return (
    <SafeAreaView className="bg-[#0C0C0C] flex-1">
      <View className="flex-row items-center px-4">
        <BackBtn />
        <Text className="text-white font-inter ml-6 mt-3 text-2xl font-semibold">
          Terms & Conditions
        </Text>
      </View>

      <ScrollView className="px-4 mt-6 mb-6">
        {termsText.map((section, index) => (
          <View key={index} className="bg-[#181818] rounded-xl p-4 mb-4 border border-[#2A2A2A]">
            <Text className="text-white font-inter text-lg font-semibold mb-2">
              {section.title}
            </Text>
            <Text className="text-gray-400 font-inter text-base">
              {section.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;