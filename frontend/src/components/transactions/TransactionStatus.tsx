import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types/transaction";

interface TransactionStatusProps {
  status: Transaction["status"];
}

export const TransactionStatus = ({ status }: TransactionStatusProps) => {
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Success":
        return "bg-green-500 hover:bg-green-600";
      case "Failed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} text-white`}>
      {status}
    </Badge>
  );
};