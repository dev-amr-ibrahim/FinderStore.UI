export interface ProfileAddressDto {
  label: string;
  recipient: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
}
