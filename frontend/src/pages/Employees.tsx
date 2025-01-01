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
import AddEmployee from "@/components/AddEmployee";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateEmployeeSuccess } from "@/redux/employees/employeeSlice";

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
  const { currentEmployees } = useSelector((state: RootState) => state.employee);
  const [employees, setEmployees] = useState<Employee[]>(currentEmployees);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] =useState<boolean>(false);
  const dispatch = useDispatch()
  
  useEffect(() => {
    setLoading(true)
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
        dispatch(updateEmployeeSuccess(response.data.employees))
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (error) return toast.error(error);

  return (
    <div className="container mx-auto p-4 my-10 min-h-[400px]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Employees Dashboard</h1>
        <Button
          onClick={() => setShowAddEmployeeForm(true)}
          className=""
          variant={"outline"}
        >
          Add New Employee
        </Button>
      </div>
      {
        loading ? 
        <div className="text-center">Loading...</div>:
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
          {
            employees.length > 0 && employees.map((employee) => (
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
            ))
          }
        </TableBody>
      </Table>
      }

      {showAddEmployeeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
            <AddEmployee onClose={() => setShowAddEmployeeForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
