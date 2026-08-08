export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  addresses: Address[];
  wishlist: number[];
  createdAt: Date;
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export interface Address {
  id: number;
  type: AddressType;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export enum AddressType {
  SHIPPING = 'shipping',
  BILLING = 'billing'
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}