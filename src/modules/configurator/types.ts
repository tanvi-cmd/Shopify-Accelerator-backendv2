export interface ConfiguratorOption {
  key: string;
  value: string | number | boolean;
  price?: number;
  skuPart?: string;
}

export interface ConfiguratorConfig {
  productType?: string;
  productId?: string;
  variantId?: string;
  quantity?: number;
  width?: number;
  height?: number;
  material?: string;
  color?: string;
  options?: ConfiguratorOption[];
  customerId?: string;
  notes?: string;
}

export interface ConfiguratorValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ConfiguratorPriceResult {
  basePrice: number;
  optionsPrice: number;
  sizePrice: number;
  totalPrice: number;
  currencyCode: string;
}

export interface ConfiguratorSkuResult {
  sku: string;
  parts: string[];
}

export interface ConfiguratorCartLine {
  merchandiseId: string;
  quantity: number;
  attributes: {
    key: string;
    value: string;
  }[];
}