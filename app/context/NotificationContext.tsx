import React, { createContext, useContext, useState, ReactNode } from "react";

export type NotificationType = {
  id: string;
  title: string;
  body: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: NotificationType[];
  addNotification: (title: string, body: string) => void;
  markAllRead: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (title: string, body: string) => {
    const newNotification: NotificationType = {
      id: Date.now().toString(),
      title,
      body,
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationProvider");
  return context;
};