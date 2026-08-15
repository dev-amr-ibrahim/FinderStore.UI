import { ProfileAddressDto } from './profile-address-dto';

export interface ProfileDto {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  backupPhone?: string;
  avatarUrl: string;
  role: string;
  addresses: ProfileAddressDto[];
}
