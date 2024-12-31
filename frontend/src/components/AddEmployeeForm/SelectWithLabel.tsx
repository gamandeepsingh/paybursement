import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectWithLabelProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div className="space-y-2">
    <Label htmlFor={name} className='text-black dark:text-white'>{label}</Label>
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="bg-white/20 text-black dark:text-white">
        <SelectValue placeholder="Select option" />
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