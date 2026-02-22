import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-white mb-4">
          Camera permission required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-purple-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white">Allow Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        enableTorch={torch}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : (result) => {
              setScanned(true);
              alert(`Scanned: ${result.data}`);
            }
        }
      />

      {/* Overlay */}
      <View className="flex-1 items-center justify-center">
        <View className="w-48 h-48 border-2 border-dashed border-purple-600 rounded-2xl" />
      </View>

      <SafeAreaView className="absolute bottom-20 w-full items-center">
        <TouchableOpacity
          onPress={() => setTorch(!torch)}
          className="absolute bottom-28 right-6 bg-black/50 p-4 rounded-full"
        >
          <Ionicons
            name={torch ? "flash" : "flash-off"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScanned(false)}
          className="bg-purple-600 px-8 py-4 rounded-full"
        >
          <Text className="text-white font-semibold">
            Scan Again
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}