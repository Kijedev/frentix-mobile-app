import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHint({ onClose }: { onClose: () => void }) {
    return (
        <View style={styles.overlay}>
            <View style={styles.box}>
                <Text style={styles.title}>Welcome to Frentix 🎉</Text>
                <Text style={styles.text}>
                    We are Glad you joined us.
                </Text>

                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={{ color: "#fff" }}>Let's Start</Text>
                </TouchableOpacity>
            </View>

            {/* Arrow */}
            {/* <Ionicons
                name="arrow-down"
                size={40}
                color="#8b5cf6"
                style={styles.arrow}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
        // padding: 20,
    },
    box: {
        backgroundColor: "#1C1C1E",
        padding: 20,
        borderRadius: 20,
        width: "80%",
        marginTop: 100,
        // marginBottom: 0,
        position: "relative",
        zIndex: 100
    },
    title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    text: {
        color: "#ccc",
        marginBottom: 15,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#8b5cf6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    arrow: {
        position: "absolute",
        bottom: 60,
        right: 25,
    },
});