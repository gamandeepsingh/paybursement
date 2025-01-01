import React from 'react';
import { FormSection } from './FormSection';
import { InputWithLabel } from './InputWithLabel';

interface BankDetailsSectionProps {
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({ bankDetails, onChange }) => (
  <FormSection title="Bank Details">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputWithLabel
        label="Account Number"
        name="bankDetails.accountNumber"
        value={bankDetails.accountNumber}
        onChange={onChange}
        required
        placeholder="Enter account number"
      />
      <InputWithLabel
        label="IFSC Code"
        name="bankDetails.ifsc"
        value={bankDetails.ifsc}
        onChange={onChange}
        required
        placeholder="Enter IFSC code"
      />
    </div>
    <InputWithLabel
      label="Account Holder Name"
      name="bankDetails.accountHolderName"
      value={bankDetails.accountHolderName}
      onChange={onChange}
      required
      placeholder="Enter account holder name"
    />
  </FormSection>
);