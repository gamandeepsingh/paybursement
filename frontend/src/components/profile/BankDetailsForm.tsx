import React from "react";
import { BankDetails, User } from "@/types/user";
import { InputWithLabel } from "../AddEmployeeForm/InputWithLabel";
import { Button } from "../ui/button";

interface BankDetailsFormProps {
  bankDetails?: BankDetails;
  onSubmit: (data: Partial<User>) => void;
}

export const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  bankDetails,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    accountNumber: bankDetails?.accountNumber || "",
    ifsc: bankDetails?.ifsc || "",
    accountHolderName: bankDetails?.accountHolderName || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bankDetails: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <InputWithLabel
          label="Account Number"
          value={formData.accountNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))
          }
          required
          placeholder="Account Number"
          name="accountNumber"
          type="text"
        />
      </div>

      <div>
        <InputWithLabel
          label="IFSC Code"
          value={formData.ifsc}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, ifsc: e.target.value }))
          }
          required
          placeholder="IFSC Code"
          name="ifsc"
          type="text"
        />
      </div>

      <div>
        <InputWithLabel
          label="Account Holder Name"
          value={formData.accountHolderName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              accountHolderName: e.target.value,
            }))
          }
          required
          placeholder="Account Holder Name"
          name="accountHolderName"
          type="text"
        />
      </div>

      <Button variant={"destructive"} type="submit">Update Bank Details</Button>
    </form>
  );
};
