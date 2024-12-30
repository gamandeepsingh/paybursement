import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

interface EmployeeDetails {
  fullname: {
    firstname: string;
    lastname: string;
  };
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  _id: string;
  email: string;
  phone: string;
  salary: number;
  createdBy: string;
  scheduleId: string;
  transactionLogId: string[];
  createdAt: string;
}

interface Employee {
  employeeId: EmployeeDetails;
  scheduleId: string;
  _id: string;
  transactionLogId: string[];
}

interface ApiResponse {
  employees: Employee[];
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "/api/employee/get-employee-by-userId",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployees(response.data.employees);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Employees Dashboard</h1>
      <Table>
        <TableCaption>A list of your employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.employeeId._id}>
              <TableCell className="font-medium">{`${employee.employeeId.fullname.firstname} ${employee.employeeId.fullname.lastname}`}</TableCell>
              <TableCell>{employee.employeeId.email}</TableCell>
              <TableCell>{employee.employeeId.phone}</TableCell>
              <TableCell>{employee.employeeId.salary}</TableCell>
              <TableCell className="text-right">
                <Link to={`/employee/${employee.employeeId._id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employees;
