import { useState, useEffect } from "react";
import axios from "axios";
import { Transaction } from "@/types/transaction";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<{ transactions: Transaction[] }>(
        "/api/transaction/logs"
      );
      setTransactions(response.data.transactions);
      setError(null);
    } catch (err) {
      setError("Failed to fetch transactions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading, error, refetch: fetchTransactions };
};