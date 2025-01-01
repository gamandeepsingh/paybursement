import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="py-6 rounded-lg space-y-4">
    <h3 className="font-semibold text-lg text-black dark:text-white">{title}</h3>
    {children}
  </div>
);