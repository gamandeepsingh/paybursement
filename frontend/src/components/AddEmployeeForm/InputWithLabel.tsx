import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ 
  label, 
  name, 
  value, 
  placeholder, 
  onChange, 
  required, 
  type = "text" 
}) => (
  <div className="space-y-2">
    <Label htmlFor={name} className='text-black dark:text-white'>
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="text-black dark:text-white bg-white/10 placeholder:text-gray-400/50  focus:ring-2 focus:ring-primary/50"
    />
  </div>
);