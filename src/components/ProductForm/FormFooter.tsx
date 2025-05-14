
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave?: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  onSubmit,
  isSubmitting = false,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="sticky bottom-0 left-0 w-full bg-white shadow-md border-t p-4 flex justify-between">
      <div>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="border-verdent-300 hover:bg-verdent-50 hover:text-verdent-700"
          >
            <span className="bg-gradient-to-r from-blue-500 to-verdent-500 bg-clip-text text-transparent">Previous</span>
          </Button>
        )}
      </div>
      <div className="flex space-x-3">
        {onSave && (
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            disabled={isSubmitting}
            className="border-verdent-300 hover:bg-verdent-50 hover:text-verdent-700"
          >
            <span className="bg-gradient-to-r from-blue-500 to-verdent-500 bg-clip-text text-transparent">Save Draft</span>
          </Button>
        )}
        {!isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-verdent-500 hover:from-blue-600 hover:to-verdent-600 text-white"
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-verdent-600 hover:from-blue-700 hover:to-verdent-700 text-white"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
