import React from 'react';
import { FormSection } from './FormSection';
import { SelectWithLabel } from './SelectWithLabel.tsx';
import { InputWithLabel } from './InputWithLabel';

interface ScheduleSectionProps {
  schedule: {
    frequency: "Daily" | "Weekly" | "Monthly";
    nextRun: string;
  };
  onFrequencyChange: (value: string) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  schedule,
  onFrequencyChange,
  onDateChange,
}) => (
  <FormSection title="Payment Schedule">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Frequency"
        name="schedule.frequency"
        value={schedule.frequency}
        onChange={onFrequencyChange}
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
        value={schedule.nextRun}
        onChange={onDateChange}
        required
      />
    </div>
  </FormSection>
);