import * as Notifications from 'expo-notifications';

// Handle notifications when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

// Request permission from user (call once on app load)
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Notification permission not granted!');
    return false;
  }

  return true;
};

// Schedule a local notification immediately
export const sendLocalNotification = async (
  title: string,
  body: string
) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger: null, // immediately
  });
};