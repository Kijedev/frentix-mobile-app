import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loading, setLoading] = useState(true);
    const [hasAccount, setHasAccount] = useState(false);

    const [loaded] = useFonts({
        Inter: require("@/assets/font/Inter-Black.ttf"),
    });

    useEffect(() => {
        const checkAccount = async () => {
            try {
                const value = await AsyncStorage.getItem("hasAccount");

                if (value === "true") {
                    setHasAccount(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkAccount();
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded || loading) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!hasAccount ? (
                    <Stack.Screen name="(onboarding)" />
                ) : (
                    <>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="(auth)" />
                    </>
                )}

                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>

            <StatusBar style="light" />
        </ThemeProvider>
    );
}