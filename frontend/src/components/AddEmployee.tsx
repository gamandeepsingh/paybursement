import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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

const InputWithLabel: React.FC<{
  label: string;
  name: string;
  value: string;
  placeholder?:string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}> = ({ label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={props.name}>{label} {props.required && "*"}</Label>
    <Input id={props.name} placeholder={props.placeholder || ""} className="bg-white/20 placeholder:text-primarylight/30" {...props} />
  </div>
);

const SelectWithLabel: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Select onValueChange={(newValue) => onChange(newValue)} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select frequency" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const AddEmployee: React.FC = () => {
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
    if (typeof e === 'string' && field) {
      // Handle Select onChange
      setFormData((prev) => ({
        ...prev,
        schedule: { ...prev.schedule, [field]: e },
      }));
    } else if (typeof e === 'object') {
      // Handle Input onChange
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
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-primarylight dark:bg-primary rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center ">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InputWithLabel
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            placeholder="John"
          />
          <InputWithLabel
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
        <InputWithLabel
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
        <InputWithLabel
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="91XXXXXXXX"
        />
        <InputWithLabel
          label="Salary"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          placeholder="e.g. 10000 "
        />

        <div className=" py-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg">Bank Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <InputWithLabel
              label="Account Number"
              name="bankDetails.accountNumber"
              value={formData.bankDetails.accountNumber}
              onChange={handleChange}
              required
              placeholder="A/C no."
            />
            <InputWithLabel
              label="IFSC Code"
              name="bankDetails.ifsc"
              value={formData.bankDetails.ifsc}
              onChange={handleChange}
              required
              placeholder="Bank ifcs code"
            />
          </div>
          <InputWithLabel
            label="Account Holder Name"
            name="bankDetails.accountHolderName"
            value={formData.bankDetails.accountHolderName}
            onChange={handleChange}
            required
            placeholder="A/C holder name"
          />
        </div>

        <div className="py-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg">Payment Schedule</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-6">
            <SelectWithLabel
              label="Frequency"
              name="schedule.frequency"
              value={formData.schedule.frequency}
              onChange={(value) => handleChange(value, "frequency")}
              options={[
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
              ]}
            />
            <InputWithLabel
              label="Next Run Date"
              type="date"
              name="schedule.nextRun"
              value={formData.schedule.nextRun}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
