
import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  completion?: {
    filled: number;
    total: number;
    percentText?: string;
  };
  helpText?: string;
  helpLink?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  required = false,
  className,
  children,
  completion,
  helpText,
  helpLink,
}) => {
  return (
    <div className={cn("border rounded-lg bg-white shadow-sm mb-6", className)}>
      <div className="flex justify-between items-center border-b px-6 py-4">
        <div className="flex items-center">
          {required && <span className="text-red-500 mr-1">*</span>}
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-gray-500 text-sm ml-3">{description}</p>}
        </div>
        <div className="flex items-center space-x-3">
          {completion && (
            <div className="flex items-center text-sm">
              <span>{completion.filled}/{completion.total}</span>
              {completion.percentText && (
                <span className="ml-2 text-red-500">{completion.percentText}</span>
              )}
            </div>
          )}
          {helpText && (
            <div className="text-sm text-gray-500">
              {helpLink ? (
                <a href={helpLink} className="text-blue-500 hover:text-blue-600">
                  {helpText}
                </a>
              ) : (
                <span>{helpText}</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default FormSection;
