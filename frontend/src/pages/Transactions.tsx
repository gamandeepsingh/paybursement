import { useState } from "react";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { SearchInput } from "@/components/transactions/SearchInput";
import { Pagination } from "@/components/transactions/Pagination";
import { useTransactions } from "@/hooks/useTransactions";
import Breadcrumb from "@/components/Breadcrumbs";

const Transaction = () => {
  const { transactions, loading, error } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.employeeId.fullname.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-10">
      <div className="ml-2">
        <Breadcrumb
          items={[
            { href: "/dashboard", label: "Dashboard" },
            { label: "Transactions" },
          ]}
        />
      </div>
      <div className="min-h-[400px] w-full p-4 mb-10 mt-5">
        <div className="mb-4 flex flex-wrap justify-between items-center">
          <h2 className="text-2xl font-bold">Transaction Logs</h2>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="rounded-md border">
          <TransactionTable
            transactions={paginatedTransactions}
            loading={loading}
          />
        </div>

        {filteredTransactions.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredTransactions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Transaction;
