import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UpdateEmployeeForm } from '@/components/UpdateEmployeeForm';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface UpdateEmployeeModalProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdateEmployeeModal({
  employee,
  isOpen,
  onClose,
  onSuccess,
}: UpdateEmployeeModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axios.post(
        `/api/employee/update-employee/${employee._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      toast('Employee details updated successfully');
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Employee Details</DialogTitle>
        </DialogHeader>
        <UpdateEmployeeForm
          employee={employee}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}