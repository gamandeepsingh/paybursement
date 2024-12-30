import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BadgeIndianRupee,
  Building2,
  Calendar,
  Mail,
  Phone,
  User,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FullName {
  firstname: string;
  lastname: string;
}

interface BankDetails {
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
}

interface Schedule {
  _id: string;
  frequency: string;
  nextRun: string;
  status: string;
}

interface Employee {
  fullname: FullName;
  bankDetails: BankDetails;
  _id: string;
  email: string;
  phone: string;
  salary: number;
  createdBy: string;
  scheduleId: Schedule;
  transactionLogId: string[];
  createdAt: string;
  __v: number;
}

interface Transaction {
  id: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
}

interface EmployeeResponse {
  employee: Employee;
  transactions: Transaction[];
}

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employeeData, setEmployeeData] = useState<EmployeeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get<EmployeeResponse>(
          `/api/employee/get-employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-[250px]" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );

  if (!employeeData) return <div>Employee not found</div>;

  const { employee, transactions } = employeeData;
  const initials = `${employee.fullname.firstname[0]}${employee.fullname.lastname[0]}`;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10 mb-20">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">
            {employee.fullname.firstname} {employee.fullname.lastname}
          </h1>
          <p className="text-muted-foreground">Employee Profile</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{employee.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">Account Holder</p>
              <p className="font-medium">{employee.bankDetails.accountHolderName}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{employee.bankDetails.accountNumber}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">IFSC Code</p>
              <p className="font-medium">{employee.bankDetails.ifsc}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Salary Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="text-xl font-semibold">
                {formatCurrency(employee.salary)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {employee.scheduleId.frequency} (Next: {new Date(employee.scheduleId.nextRun).toLocaleDateString()})
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(transaction.status)} text-white`}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetails;