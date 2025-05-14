
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
  '基础信息',
  '图文信息',
  '价格库存',
  '服务与保障',
  '其他信息',
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
        title: "请填写必填信息",
        description: "商品标题是必填项",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(Math.min(FormSteps.length - 1, currentStep + 1));
    window.scrollTo(0, 0);
  };

  const handleSaveDraft = () => {
    toast({
      title: "草稿已保存",
      description: "您可以稍后继续编辑",
    });
  };

  const handleSubmit = () => {
    if (!formData.basicInfo.productName) {
      toast({
        title: "请填写必填信息",
        description: "商品标题是必填项",
        variant: "destructive",
      });
      setCurrentStep(0);
      return;
    }

    if (formData.images.mainImages.length === 0) {
      toast({
        title: "请上传商品图片",
        description: "至少需要上传一张主图",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    if (formData.pricing.salePrice <= 0) {
      toast({
        title: "请设置有效的价格",
        description: "销售价格必须大于0",
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
        title: "商品发布成功",
        description: "您的商品已成功发布上架",
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
            title="基础信息" 
            required={true}
            completion={{ filled: formData.basicInfo.productName ? 1 : 0, total: 1, percentText: "填写率+0.7%" }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">
                  <span className="text-red-500">*</span> 商品标题
                </Label>
                <Input
                  id="productName"
                  placeholder="请输入15-50个字符"
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
                  <Label htmlFor="category">品牌</Label>
                  <Select
                    value={formData.basicInfo.brand}
                    onValueChange={(value) => handleInputChange('basicInfo', 'brand', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand1">品牌1</SelectItem>
                      <SelectItem value="brand2">品牌2</SelectItem>
                      <SelectItem value="brand3">品牌3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetAudience">适用人群</Label>
                  <Select
                    value={formData.basicInfo.targetAudience}
                    onValueChange={(value) => handleInputChange('basicInfo', 'targetAudience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">通用</SelectItem>
                      <SelectItem value="men">男士</SelectItem>
                      <SelectItem value="women">女士</SelectItem>
                      <SelectItem value="children">儿童</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="material">适合材料</Label>
                  <Select
                    value={formData.basicInfo.material}
                    onValueChange={(value) => handleInputChange('basicInfo', 'material', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cotton">棉质</SelectItem>
                      <SelectItem value="linen">亚麻</SelectItem>
                      <SelectItem value="silk">丝绸</SelectItem>
                      <SelectItem value="wool">羊毛</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="style">款式</Label>
                  <Select
                    value={formData.basicInfo.style}
                    onValueChange={(value) => handleInputChange('basicInfo', 'style', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">休闲</SelectItem>
                      <SelectItem value="formal">正式</SelectItem>
                      <SelectItem value="sport">运动</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="shape">特色</Label>
                  <Select
                    value={formData.basicInfo.shape}
                    onValueChange={(value) => handleInputChange('basicInfo', 'shape', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">选项1</SelectItem>
                      <SelectItem value="option2">选项2</SelectItem>
                      <SelectItem value="option3">选项3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="craftType">加工工艺</Label>
                  <Select
                    value={formData.basicInfo.craftType}
                    onValueChange={(value) => handleInputChange('basicInfo', 'craftType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">手工制作</SelectItem>
                      <SelectItem value="machine">机器制作</SelectItem>
                      <SelectItem value="custom">定制</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="packagingMaterial">包装材质</Label>
                <Select
                  value={formData.basicInfo.packagingMaterial}
                  onValueChange={(value) => handleInputChange('basicInfo', 'packagingMaterial', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">纸质</SelectItem>
                    <SelectItem value="plastic">塑料</SelectItem>
                    <SelectItem value="cloth">布料</SelectItem>
                    <SelectItem value="wood">木质</SelectItem>
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
              title="图文信息" 
              required={true}
              completion={{ filled: formData.images.mainImages.length > 0 ? 1 : 0, total: 1, percentText: "转化率+2%" }}
            >
              <div className="space-y-8">
                <ImageUploader 
                  title="主图" 
                  required={true} 
                  maxImages={5} 
                  onChange={handleMainImagesChange}
                />
                
                <div className="border-t pt-6">
                  <ImageUploader 
                    title="详情辅助图" 
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
              title="价格库存" 
              required={true}
              completion={{ filled: formData.pricing.salePrice > 0 ? 1 : 0, total: 1, percentText: "转化率+15%" }}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="block mb-2">
                    <span className="text-red-500">*</span> 发货模式
                  </Label>
                  <RadioGroup 
                    value={formData.pricing.priceType}
                    onValueChange={(value) => handleInputChange('pricing', 'priceType', value)}
                    className="flex space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">现货发货模式</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="range" id="range" />
                      <Label htmlFor="range">预购及其他模式</Label>
                    </div>
                  </RadioGroup>
                  <div className="text-xs text-gray-500">
                    注：常规货品请选择第一种模式，以确保发货及时。预定类商品、定制商品或其他需要延迟发货的商品请选择第二种模式。
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">
                      <span className="text-red-500">*</span> 商品售价
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">¥</span>
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
                    <Label htmlFor="stockQuantity">库存数量</Label>
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
                    <Label htmlFor="hasDiscount">显示划线价格</Label>
                  </div>
                  
                  {formData.pricing.hasDiscount && (
                    <div className="ml-6 mt-2">
                      <Label htmlFor="originalPrice">划线价格</Label>
                      <div className="relative w-1/2">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">¥</span>
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
              title="服务与保障" 
              required={true}
            >
              <div className="space-y-6">
                <div>
                  <Label htmlFor="shippingMethod" className="block mb-2">
                    <span className="text-red-500">*</span> 运费模板
                  </Label>
                  <Select
                    value={formData.shipping.shippingMethod}
                    onValueChange={(value) => handleInputChange('shipping', 'shippingMethod', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="请选择" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">包邮</SelectItem>
                      <SelectItem value="flat">统一运费</SelectItem>
                      <SelectItem value="weight">按重量计费</SelectItem>
                      <SelectItem value="quantity">按数量计费</SelectItem>
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
                    <Label htmlFor="afterSalesService">订单完成15天内售后保障</Label>
                  </div>
                </div>

                <div>
                  <Label className="block mb-2">售后政策</Label>
                  <RadioGroup 
                    value={formData.shipping.returnsAllowed ? "accept" : "no"}
                    onValueChange={(value) => handleInputChange('shipping', 'returnsAllowed', value === "accept")}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="accept" id="accept-returns" />
                      <Label htmlFor="accept-returns">7天无理由退换</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-returns" />
                      <Label htmlFor="no-returns">不支持</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="block mb-2">售后服务方式</Label>
                  <RadioGroup 
                    value="exchange"
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exchange" id="exchange" />
                      <Label htmlFor="exchange">不支持</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="refund-and-exchange" id="refund-and-exchange" disabled />
                      <Label htmlFor="refund-and-exchange">延长售后服务有效期</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="block mb-2">商品状态</Label>
                  <RadioGroup 
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', 'status', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">上架</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <Label htmlFor="inactive">下架</Label>
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
            <FormSection title="其他信息">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">商品描述</Label>
                  <Textarea
                    id="description"
                    placeholder="请详细描述您的商品特点、用途、适用场景等信息"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>商品标签</Label>
                  <Input
                    placeholder="请输入标签，多个标签用逗号分隔"
                  />
                  <p className="text-xs text-gray-500">
                    标签能提高商品被搜索到的几率，建议添加3-5个标签
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">商品发布</h1>
          <p className="text-gray-500">请填写以下信息，完成商品上架</p>
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
