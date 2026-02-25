import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth } from "../firebase";

export type TransactionType = {
  id: string;
  name: string;
  amount: number;
  note?: string;
  date: string;
  type: "sent" | "received";
};

type TransactionContextType = {
  transactions: TransactionType[];
  balance: number;
  addTransaction: (tx: Omit<TransactionType, "id" | "date">) => boolean;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const user = auth.currentUser;
  const STORAGE_KEY = user ? `BANK_APP_DATA_${user.uid}` : null;

  // 🔥 Load user-specific data
  useEffect(() => {
    const loadData = async () => {
      if (!STORAGE_KEY) return;

      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setTransactions(parsed.transactions || []);
        setBalance(parsed.balance || 0);
      } else {
        // New user starts fresh
        setTransactions([]);
        setBalance(0);
      }
    };

    loadData();
  }, [STORAGE_KEY]);

  // 🔥 Save user-specific data
  useEffect(() => {
    const saveData = async () => {
      if (!STORAGE_KEY) return;

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ transactions, balance })
      );
    };

    saveData();
  }, [transactions, balance, STORAGE_KEY]);

  const addTransaction = (
    tx: Omit<TransactionType, "id" | "date">
  ): boolean => {
    if (tx.type === "sent" && tx.amount > balance) {
      Alert.alert("Transaction Failed", "Insufficient balance ❌");
      return false;
    }

    const newTransaction: TransactionType = {
      ...tx,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    if (tx.type === "sent") {
      setBalance((prev) => prev - tx.amount);
    } else {
      setBalance((prev) => prev + tx.amount);
    }

    return true;
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, balance, addTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used inside TransactionProvider");
  }
  return context;
};