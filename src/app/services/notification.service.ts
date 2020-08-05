import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    // The second parameter is the text in the button. 
    this.snackBar.open(message, 'Đóng');
  }

  showError(message: string): void {
    // In the third, we send in the css class for the snack bar.
    const errorMessage = this.parseError(message);
    this.snackBar.open(errorMessage, 'Đóng', { panelClass: ['error'] });
  }

  close() {
    this.snackBar.dismiss();
  }

  parseError(code: string) {
    switch (code) {
      case 'LOGIN_INVALID':
        return 'Tên đăng nhập hoặc mật khẩu không chính xác';
      case 'EXAMPLE':
        return 'Example error';
      default:
        return 'Đã có lỗi xảy ra';
    }
  }
}