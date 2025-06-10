export interface Perfume {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity?: number;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Perfume {
  quantity: number;
}

export interface TestimonialType {
  id: string;
  name: string;
  position: string;
  comment: string;
  avatar: string;
}