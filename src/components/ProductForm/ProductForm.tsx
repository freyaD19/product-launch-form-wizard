
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import FormStepIndicator from './FormStepIndicator';
import FormSection from './FormSection';
import ImageUploader from './ImageUploader';
import FormFooter from './FormFooter';

type FormData = {
  basicInfo: {
    productName: string;
    category: string;
    brand: string;
    targetAudience: string;
    material: string;
    style: string;
    shape: string;
    craftType: string;
    packagingMaterial: string;
  };
  images: {
    mainImages: string[];
    detailImages: string[];
  };
  pricing: {
    priceType: 'fixed' | 'range';
    originalPrice: number;
    salePrice: number;
    hasDiscount: boolean;
    stockQuantity: number;
  };
  specifications: {
    options: Array<{
      name: string;
      values: string[];
    }>;
    variants: Array<{
      combination: Record<string, string>;
      price: number;
      stock: number;
      sku: string;
    }>;
  };
  shipping: {
    shippingMethod: string;
    freeShipping: boolean;
    returnsAllowed: boolean;
    returnsWindow: number;
    afterSalesService: boolean;
    afterSalesOptions: string[];
  };
  status: 'active' | 'inactive';
};

const initialFormData: FormData = {
  basicInfo: {
    productName: '',
    category: '',
    brand: '',
    targetAudience: '',
    material: '',
    style: '',
    shape: '',
    craftType: '',
    packagingMaterial: '',
  },
  images: {
    mainImages: [],
    detailImages: [],
  },
  pricing: {
    priceType: 'fixed',
    originalPrice: 0,
    salePrice: 0,
    hasDiscount: false,
    stockQuantity: 0,
  },
  specifications: {
    options: [],
    variants: [],
  },
  shipping: {
    shippingMethod: '',
    freeShipping: false,
    returnsAllowed: true,
    returnsWindow: 7,
    afterSalesService: false,
    afterSalesOptions: [],
  },
  status: 'active',
};

const FormSteps = [
  'Basic Information',
  'Images & Media',
  'Pricing & Stock',
  'Services & Guarantees',
  'Additional Info',
];

const ProductForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section as keyof FormData],
        [field]: value,
      },
    });
  };

  const handleMainImagesChange = (images: string[]) => {
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        mainImages: images,
      },
    });
  };

  const handleDetailImagesChange = (images: string[]) => {
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        detailImages: images,
      },
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
    window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (currentStep === 0 && !formData.basicInfo.productName) {
      toast({
        title: "Please fill in required information",
        description: "Product title is required",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(Math.min(FormSteps.length - 1, currentStep + 1));
    window.scrollTo(0, 0);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "You can continue editing later",
    });
  };

  const handleSubmit = () => {
    if (!formData.basicInfo.productName) {
      toast({
        title: "Please fill in required information",
        description: "Product title is required",
        variant: "destructive",
      });
      setCurrentStep(0);
      return;
    }

    if (formData.images.mainImages.length === 0) {
      toast({
        title: "Please upload product images",
        description: "At least one main image is required",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    if (formData.pricing.salePrice <= 0) {
      toast({
        title: "Please set a valid price",
        description: "Sale price must be greater than 0",
        variant: "destructive",
      });
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Product published successfully",
        description: "Your product has been listed successfully",
      });
      
      // Reset form or redirect
      // setFormData(initialFormData);
      // setCurrentStep(0);
    }, 1500);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormSection 
            title="Basic Information" 
            required={true}
            completion={{ filled: formData.basicInfo.productName ? 1 : 0, total: 1, percentText: "Fill rate +0.7%" }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">
                  <span className="text-red-500">*</span> Product Title
                </Label>
                <Input
                  id="productName"
                  placeholder="Enter 15-50 characters"
                  maxLength={50}
                  value={formData.basicInfo.productName}
                  onChange={(e) => handleInputChange('basicInfo', 'productName', e.target.value)}
                />
                <div className="text-xs text-right text-gray-500">
                  {formData.basicInfo.productName.length}/50
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    value={formData.basicInfo.brand}
                    onValueChange={(value) => handleInputChange('basicInfo', 'brand', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand1">Brand 1</SelectItem>
                      <SelectItem value="brand2">Brand 2</SelectItem>
                      <SelectItem value="brand3">Brand 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select
                    value={formData.basicInfo.targetAudience}
                    onValueChange={(value) => handleInputChange('basicInfo', 'targetAudience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Universal</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="children">Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select
                    value={formData.basicInfo.material}
                    onValueChange={(value) => handleInputChange('basicInfo', 'material', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="linen">Linen</SelectItem>
                      <SelectItem value="silk">Silk</SelectItem>
                      <SelectItem value="wool">Wool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="style">Style</Label>
                  <Select
                    value={formData.basicInfo.style}
                    onValueChange={(value) => handleInputChange('basicInfo', 'style', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="sport">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="shape">Features</Label>
                  <Select
                    value={formData.basicInfo.shape}
                    onValueChange={(value) => handleInputChange('basicInfo', 'shape', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="craftType">Manufacturing Process</Label>
                  <Select
                    value={formData.basicInfo.craftType}
                    onValueChange={(value) => handleInputChange('basicInfo', 'craftType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Handcrafted</SelectItem>
                      <SelectItem value="machine">Machine-made</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="packagingMaterial">Packaging Material</Label>
                <Select
                  value={formData.basicInfo.packagingMaterial}
                  onValueChange={(value) => handleInputChange('basicInfo', 'packagingMaterial', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="cloth">Cloth</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormSection>
        );

      case 1:
        return (
          <>
            <FormSection 
              title="Images & Media" 
              required={true}
              completion={{ filled: formData.images.mainImages.length > 0 ? 1 : 0, total: 1, percentText: "Conversion rate +2%" }}
            >
              <div className="space-y-8">
                <ImageUploader 
                  title="Main Images" 
                  required={true} 
                  maxImages={5} 
                  onChange={handleMainImagesChange}
                />
                
                <div className="border-t pt-6">
                  <ImageUploader 
                    title="Detail Images" 
                    required={false} 
                    maxImages={8} 
                    onChange={handleDetailImagesChange}
                  />
                </div>
              </div>
            </FormSection>
          </>
        );

      case 2:
        return (
          <>
            <FormSection 
              title="Pricing & Stock" 
              required={true}
              completion={{ filled: formData.pricing.salePrice > 0 ? 1 : 0, total: 1, percentText: "Conversion rate +15%" }}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="block mb-2">
                    <span className="text-red-500">*</span> Shipping Mode
                  </Label>
                  <RadioGroup 
                    value={formData.pricing.priceType}
                    onValueChange={(value) => handleInputChange('pricing', 'priceType', value)}
                    className="flex space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Ready to Ship</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="range" id="range" />
                      <Label htmlFor="range">Pre-order & Other Modes</Label>
                    </div>
                  </RadioGroup>
                  <div className="text-xs text-gray-500">
                    Note: Choose the first option for regular products to ensure timely shipping. Choose the second option for pre-orders, customized items, or other products that require delayed shipping.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">
                      <span className="text-red-500">*</span> Product Price
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                      <Input
                        id="originalPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-8"
                        placeholder="0.00"
                        value={formData.pricing.salePrice || ''}
                        onChange={(e) => handleInputChange('pricing', 'salePrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={formData.pricing.stockQuantity || ''}
                      onChange={(e) => handleInputChange('pricing', 'stockQuantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasDiscount" 
                      checked={formData.pricing.hasDiscount}
                      onCheckedChange={(checked) => {
                        handleInputChange('pricing', 'hasDiscount', checked === true);
                      }}
                    />
                    <Label htmlFor="hasDiscount">Show Strikethrough Price</Label>
                  </div>
                  
                  {formData.pricing.hasDiscount && (
                    <div className="ml-6 mt-2">
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <div className="relative w-1/2">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                        <Input
                          id="originalPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          className="pl-8"
                          placeholder="0.00"
                          value={formData.pricing.originalPrice || ''}
                          onChange={(e) => handleInputChange('pricing', 'originalPrice', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FormSection>
          </>
        );

      case 3:
        return (
          <>
            <FormSection 
              title="Services & Guarantees" 
              required={true}
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="shippingMethod" className="block mb-2">
                    <span className="text-red-500">*</span> Shipping Template
                  </Label>
                  <Select
                    value={formData.shipping.shippingMethod}
                    onValueChange={(value) => handleInputChange('shipping', 'shippingMethod', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free Shipping</SelectItem>
                      <SelectItem value="flat">Flat Rate</SelectItem>
                      <SelectItem value="weight">Weight-based</SelectItem>
                      <SelectItem value="quantity">Quantity-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="afterSalesService" 
                      checked={formData.shipping.afterSalesService}
                      onCheckedChange={(checked) => {
                        handleInputChange('shipping', 'afterSalesService', checked === true);
                      }}
                    />
                    <Label htmlFor="afterSalesService">15-day After-sale Protection</Label>
                  </div>
                </div>

                <div>
                  <Label className="block mb-2">Return Policy</Label>
                  <RadioGroup 
                    value={formData.shipping.returnsAllowed ? "accept" : "no"}
                    onValueChange={(value) => handleInputChange('shipping', 'returnsAllowed', value === "accept")}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="accept" id="accept-returns" />
                      <Label htmlFor="accept-returns">7-day No-reason Returns</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-returns" />
                      <Label htmlFor="no-returns">Not Supported</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="block mb-2">After-sale Service Options</Label>
                  <RadioGroup 
                    value="exchange"
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exchange" id="exchange" />
                      <Label htmlFor="exchange">Not Supported</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refund-and-exchange" id="refund-and-exchange" disabled />
                      <Label htmlFor="refund-and-exchange">Extended After-sales Service Period</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="block mb-2">Product Status</Label>
                  <RadioGroup 
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', 'status', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <Label htmlFor="inactive">Inactive</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </FormSection>
          </>
        );

      case 4:
        return (
          <>
            <FormSection title="Additional Information">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your product features, uses, and suitable scenarios in detail"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product Tags</Label>
                  <Input
                    placeholder="Enter tags, separate multiple tags with commas"
                  />
                  <p className="text-xs text-gray-500">
                    Tags improve the chances of your product being found in searches. We recommend adding 3-5 tags.
                  </p>
                </div>
              </div>
            </FormSection>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-verdent-50 to-blue-50 pb-20">
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <h1 className="text-3xl font-bold text-verdent-700 mr-2">Verdent</h1>
            <span className="text-xl text-verdent-600">Seller Center</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Product Listing</h2>
          <p className="text-gray-600">Complete the form below to list your product</p>
        </div>

        <FormStepIndicator
          steps={FormSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <div>
          {renderFormStep()}
        </div>

        <FormFooter
          currentStep={currentStep}
          totalSteps={FormSteps.length}
          onPrevious={handlePrevStep}
          onNext={handleNextStep}
          onSave={handleSaveDraft}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ProductForm;
