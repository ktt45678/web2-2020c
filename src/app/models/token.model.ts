export class TokenModel {
  id: number;
  email: string;
  citizenIdentificationId?: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  phoneNumber: string;
  username: string;
  address: string;
  token?: string;
  message?: string;
}