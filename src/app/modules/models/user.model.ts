export class UserModel {
  id: number;
  email: string;
  citizenIdentificationId?: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  phoneNumber: string;
  username: string;
  address: string;
  userType: number;
  status: number;
  enable2fa: number;
  enableNoti: number;
  approveStatus?: number;
  emailVerified?: number;
  createdAt: string;
  identificationType?: string;
  issueDate?: string;
}