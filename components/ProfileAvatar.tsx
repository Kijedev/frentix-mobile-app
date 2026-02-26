import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "@/app/firebase";

export default function ProfileAvatar({ fullName }: { fullName: string }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const savedImage = await AsyncStorage.getItem(`profileImage_${user.uid}`);
    if (savedImage) setImage(savedImage);
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
      const user = auth.currentUser;
      if (!user) return;

      setImage(base64Img);
      await AsyncStorage.setItem(`profileImage_${user.uid}`, base64Img);
    }
  };

  return (
    <View className="items-center">
      <View className="relative">
        {image ? (
          <Image
            source={{ uri: image }}
            className="h-32 w-32 rounded-full border border-2 border-white"
          />
        ) : (
          <View className="bg-black/10 h-32 w-32 rounded-full items-center justify-center">
            <Text className="font-inter text-white text-5xl font-semibold">
              {fullName ? fullName.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
        )}

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