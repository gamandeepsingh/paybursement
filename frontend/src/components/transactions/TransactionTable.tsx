import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/transaction";
import { TransactionStatus } from "./TransactionStatus";

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
}

export const TransactionTable = ({
  transactions,
  loading,
}: TransactionTableProps) => {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap break-words">
            Transaction ID
          </TableHead>
          <TableHead className="whitespace-nowrap break-words">
            Employee Name
          </TableHead>
          <TableHead className="whitespace-nowrap break-words">
            Amount
          </TableHead>
          <TableHead className="whitespace-nowrap break-words">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap break-words">
            Processed By
          </TableHead>
          <TableHead className="whitespace-nowrap break-words">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction._id}>
            <TableCell className="whitespace-nowrap break-words">
              {transaction.transactionId}
            </TableCell>
            <TableCell className="whitespace-nowrap break-words">
              {`${transaction.employeeId.fullname.firstname} ${transaction.employeeId.fullname.lastname}`}
            </TableCell>
            <TableCell className="whitespace-nowrap break-words">
              ₹{transaction.amount}
            </TableCell>
            <TableCell className="whitespace-nowrap break-words">
              <TransactionStatus status={transaction.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap break-words">
              {`${transaction.processedBy.fullname.firstname} ${transaction.processedBy.fullname.lastname}`}
            </TableCell>
            <TableCell className="whitespace-nowrap break-words">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
