import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    const colorScheme = useColorScheme();

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
