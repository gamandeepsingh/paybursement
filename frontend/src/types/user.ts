export interface BankDetails {
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
}

export interface FullName {
  firstname: string;
  lastname?: string;
}

export interface User {
  _id: string;
  fullname: FullName;
  email: string;
  businessName?: string;
  phone?: number;
  gstNumber?: string;
  bankDetails?: BankDetails;
}
