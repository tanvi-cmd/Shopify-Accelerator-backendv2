export interface ReviewCreateInput {
  productId: string;
  customerId?: string;
  customerEmail?: string;
  customerName?: string;
  rating: number;
  title?: string;
  body?: string;
  status?: string;
  source?: string;
}

export interface ReviewUpdateInput {
  rating?: number;
  title?: string;
  body?: string;
  status?: string;
}