export class StatusModel {
    id: number;
    email: string;
    citizenIdentificationId: string;
    approveStatus: number;
    emailVerified: number;
    finished?: boolean;
  }