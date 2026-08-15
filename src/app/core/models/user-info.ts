import { Address } from "../interfaces/user.interface";

export interface UserInfo {
  id: string;
  name: string;
  fullname: string;
  email: string;
  role: string;
  phone?: string;
  bakedUpPhone?: string;
  addresses?: Address[];
}