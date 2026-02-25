import React, { createContext, useContext, useState } from "react";

export type TransactionType = {
  id: string;
  name: string;
  amount: string;
  note?: string;
  date: string;
};

type TransactionContextType = {
  transactions: TransactionType[];
  addTransaction: (tx: TransactionType) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const addTransaction = (tx: TransactionType) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
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