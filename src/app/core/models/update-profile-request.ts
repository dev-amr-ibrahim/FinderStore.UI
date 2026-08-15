export interface ProfileAddressRequest {
  label: string;
  recipient: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  email: string;
  phone: string;
  backupPhone?: string;
  addresses: ProfileAddressRequest[];
}
