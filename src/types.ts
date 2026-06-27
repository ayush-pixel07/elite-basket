/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  reviews: Review[];
  features: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  createdAt: string;
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber: string;
  pointsEarned: number;
  email: string;
}

export interface SimulatedEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  type: 'order_confirmation' | 'shipment_dispatched' | 'loyalty_welcome' | 'delivery_success';
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface SearchFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'popular';
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'add_to_cart' | 'checkout_start' | 'purchase' | 'search';
  path: string;
  metadata?: Record<string, any>;
  timestamp: string;
  userId?: string;
}
