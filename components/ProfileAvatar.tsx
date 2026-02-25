import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileAvatar({ fullName }: { fullName: string }) {
  const [image, setImage] = useState<string | null>(null);

  // Load image on mount
  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    const savedImage = await AsyncStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;

      setImage(base64Img);
      await AsyncStorage.setItem("profileImage", base64Img);
    }
  };

  return (
    <View className="items-center">
      {/* Avatar */}
      <View className="relative">
        {image ? (
          <Image
            source={{ uri: image }}
            className="h-32 w-32 rounded-full"
          />
        ) : (
          <View className="bg-black/10 h-32 w-32 rounded-full items-center justify-center">
            <Text className="font-inter text-white text-5xl font-semibold">
              {fullName ? fullName.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
        )}

        {/* Edit Button */}
        <TouchableOpacity
          onPress={pickImage}
          className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full"
        >
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}