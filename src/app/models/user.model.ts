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
  approveStatus: number;
  emailVerified: number;
}