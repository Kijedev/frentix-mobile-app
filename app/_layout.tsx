import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        Inter: require("@/assets/font/Inter-Black.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    statusBarTranslucent: true,
                    statusBarBackgroundColor: "transparent",
                }}
                initialRouteName="(onboarding)/index"
            >
                <Stack.Screen name="(onboarding)/index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>

            <StatusBar translucent backgroundColor="transparent" style="light" />

        </ThemeProvider>
    );
}
