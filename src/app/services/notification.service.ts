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
    this.snackBar.open(message, 'Đóng', { panelClass: ['error'] });
  }

  close() {
    this.snackBar.dismiss();
  }
}