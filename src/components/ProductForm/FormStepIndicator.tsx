
import React from 'react';
import { cn } from '@/lib/utils';

interface FormStepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full border-b pb-2 mb-6">
      <div className="flex">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex-1"
          >
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className={cn(
                "w-full text-center pb-2 text-sm font-medium border-b-2 transition-all",
                index === currentStep 
                  ? "border-blue-500 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {step}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormStepIndicator;
