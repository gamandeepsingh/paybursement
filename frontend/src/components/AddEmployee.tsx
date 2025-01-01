import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/AddEmployeeForm/InputWithLabel";
import { BankDetailsSection } from "@/components/AddEmployeeForm/BankDetailsSection";
import { ScheduleSection } from "@/components/AddEmployeeForm/ScheduleSection";
import { X } from "lucide-react";

interface AddEmployeeProps {
  onClose: () => void;
}

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  salary: string;
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  schedule: {
    frequency: "Daily" | "Weekly" | "Monthly";
    nextRun: string;
  };
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    salary: "",
    bankDetails: {
      accountNumber: "",
      ifsc: "",
      accountHolderName: "",
    },
    schedule: {
      frequency: "Monthly",
      nextRun: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    field?: string
  ) => {
    if (typeof e === "string" && field) {
      setFormData((prev) => ({
        ...prev,
        schedule: { ...prev.schedule, [field]: e },
      }));
    } else if (typeof e === "object") {
      const { name, value } = e.target;
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof FormData] as object),
            [child]: value,
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/employee/add-employee",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          salary: "",
          bankDetails: { accountNumber: "", ifsc: "", accountHolderName: "" },
          schedule: { frequency: "Monthly", nextRun: "" },
        });
        toast.success("Employee added successfully!");
        onClose();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.errors[0]?.msg ||
            "An error occurred while adding the employee."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="shadow-xl  overflow-hidden">
        <div className="dark:bg-black px-6 py-8  flex justify-between items-center">
          <h2 className="text-lg md:text-3xl font-bold">Add New Employee</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className=""
          >
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="dark:bg-black p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWithLabel
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
            <InputWithLabel
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div className="space-y-6">
            <InputWithLabel
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
            <InputWithLabel
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
            <InputWithLabel
              label="Salary"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              placeholder="Enter salary amount"
            />
          </div>

          <BankDetailsSection
            bankDetails={formData.bankDetails}
            onChange={handleChange}
          />

          <ScheduleSection
            schedule={formData.schedule}
            onFrequencyChange={(value) => handleChange(value, "frequency")}
            onDateChange={handleChange}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onClose} variant={"destructive"}>
              Cancel
            </Button>
            <Button type="submit" variant={"outline"}>
              Add Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
