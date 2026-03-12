import * as Notifications from "expo-notifications";

export const sendNotification = async (amount: number) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Deposit Successful 💸",
      body: `₦${amount.toLocaleString()} has been added successfully`,
      sound: true,
    },
    trigger: null,
  });
};