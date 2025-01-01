interface FullName {
    firstname: string;
    lastname: string;
  }
  
  interface Employee {
    _id: string;
    fullname: FullName;
    email: string;
    phone: string;
    salary: number;
  }
  
  interface ProcessedBy {
    _id: string;
    fullname: FullName;
    businessName?: string;
  }
  
 export interface Transaction {
    _id: string;
    employeeId: Employee;
    processedBy: ProcessedBy;
    amount: number;
    status: 'Pending' | 'Success' | 'Failed';
    transactionId: string;
    createdAt: string;
  }