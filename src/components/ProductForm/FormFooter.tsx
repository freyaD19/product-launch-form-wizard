
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
          >
            上一步
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
          >
            保存草稿
          </Button>
        )}
        {!isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
          >
            下一步
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? '提交中...' : '发布商品'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
