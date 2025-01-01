import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <Input
      type="text"
      placeholder="Search by name or transaction ID..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-64 mr-1 my-4 sm:my-0"
    />
  );
};