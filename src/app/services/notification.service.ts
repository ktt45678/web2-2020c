import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    // The second parameter is the text in the button. 
    this.snackBar.open(message, 'Đóng');
  }

  showInfo(message: string): void {
    // Error without error code
    this.snackBar.open(message, 'Đóng', { panelClass: ['info'] });
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
      case 'ACCOUNTID_EMPTY':
        //return 'accountId must not empty';
        return 'Mã tài khoản nhận không được rỗng';
      case 'REQUESTACCOUNTID_EMPTY':
        //return 'requestAccountId must not empty';
        return 'Mã tài khoản không được rỗng';
      case 'MONEY_EMPTY':
        //return 'money must not empty';
        return 'Số tiền không được rỗng';
      case 'MONEY_INVALID':
        //return 'your input value is invalid, only positive value';
        return 'Số tiền không hợp lệ, số tiền chỉ có thể là giá trị dương';
      case 'MESSAGE_TOO_SHORT':
        //return 'your message too long, maximum: 512 characters';
        return 'Tin nhắn quá dài, tin nhắn tối đa 512 kí tự';
      case 'MESSAGE_TOO_LONG':
        //return 'your message too long, maximum: 512 characters';
        return 'Tin nhắn quá ngắn, tin nhắn tối đa 512 kí tự';
      case 'SELF_DETECT':
        //return 'You can not transfer to your sending account';
        return 'Không thể tự chuyển khoản cho bản thân';
      case 'NOT_BELONG':
        //return 'This account not belong to the current user';
        return 'Tài khoản này không thuộc về người dùng hiện tại';
      case 'NOT_EXISTS':
        //return 'Destination account not exists';
        return 'Tài khoản đích không tồn tại';
      case 'SELF_NOT_EXISTS':
        //return 'Your account not exists or does not a payment account';
        return 'Tài khoản của bạn không tồn tại hoặc không phải là tài khoản thanh toán';
      case 'SELF_LOCKED':
        //return 'Your account being locked';
        return 'Tài khoản của bạn đã bị khóa';
      case 'DESTINATION_LOCKED':
        //return 'Destination account being locked';
        return 'Tài khoảng đích đã bị khóa';
      case 'NOT_ENOUGH':
        //return 'The total of transfer value and fee is larger than your balance';
        return 'Số dư không đủ để thực hiện chuyển khoản (bao gồm phí chuyển khoản và số tiền muốn gửi)';
      case 'NOT_ENOUGH_WITHDRAW':
        //return 'The withdraw value is invalid or larger than your balance';
        return 'Số tiền muốn rút không hợp lệ hoặc lớn hơn số dư của bạn';
      case 'REQUIRE_MINIMUM':
        //return 'Your transfer value not reached the minimum threshold, minimum is 20000 VND';
        return 'Số tiền muốn chuyến không đạt giá trị tối thiểu (20.000 VND)';
      case 'LIMIT_TRANSFER':
        //return 'You reached the maximum threshold of the transfer, maximum is 200mil VND';
        return 'Đã đạt mức chuyển khoản tối đa (200.000.000 VND)';
      case 'LIMIT_DAY':
        //return 'You reached the maximum threshold of the day, maximum is 500mil VND';
        return 'Đã đạt mức chuyển khoản tối đa hằng ngày (500.000.000 VND)';
      case 'LIMIT_MONTH':
        //return 'You reached the maximum threshold of the month, maximum is 10bil VND';
        return 'Đã đạt mức chuyển khoản tối đa hằng tháng (10.000.000.000 VND)';
      case 'REFUND':
        //return 'Something happened, can not transfer at now, we have refunded';
        return 'Đã có lỗi xảy ra, không thể thực hiện chuyển khoản tại thời điểm này, số tiền gửi đã được hoàn trả';
      case 'INVALID_TERM':
        //return 'Term can only: 3, 6, 12, 18, 24, 30, 36';
        return 'Kì hạn chỉ có thể là : 3, 6, 12, 18, 24, 30, 36';
      case 'INVALID_CURRENCY':
        //return 'Currency can only: VND or USD';
        return 'Đơn vị tiền chỉ có thể là VND hoặc USD';
      case 'TOO_LOW_BALANCE':
        //return 'Minimum required for create an account is 500000VND (about 22USD)';
        return 'Số tiền tối thiểu để tạo tài khoản là 500.000 VND (khoảng 22 USD)';
      case 'INVALID_ACCOUNT_TYPE':
        //return 'accountType can only 0 or 1';
        return 'Loại tài khoảng không hợp lệ';
      case 'ALREADY_STARTED_ACCUMULATED':
        //return 'Can not load up for accumulated account after the term started';  
        return 'Không thể nạp thêm cho tài khoảng tiết kiệm khi kì hạn đã bắt đầu tính kì hạn';  
      case 'ACCOUNT_NOT_FOUND':
        //return 'AccountId not exist';
        return 'Không thể tìm thấy mã tài khoản';
      case 'BANK_NOT_FOUND':
        //return 'BankId not exist in bank list';
        return 'Không thể tìm thấy mã ngân hàng';
      case 'WRONG_PASSWORD':
        //return 'current Password is wrong';
        return 'Sai mật khẩu hiện tại';
      case 'EMAIL_CONFLICT':
        //return 'Email already used by other people';
        return 'Email này đã được sử dụng';
      case 'EMAIL_TOO_SHORT':
        //return 'Email to short, min is 5';
        return 'Email quá ngắn, tối thiểu 5 kí tự';
      case 'EMAIL_INVALID':
        //return 'Invalid email type';
        return 'Loại email không hợp lệ';
      case 'USERNAME_CONFLICT':
        //return 'Username already used by other people';
        return 'Tên người dùng đã được dùng bởi tài khoản khác';
      case 'USERNAME_TOO_SHORT':
        //return 'username to short, min is 3';
        return "Tên người dùng quá ngắn, tối thiểu 3 kí tự";
      case 'USERNAME_TOO_LONG':
       //return 'username to long, max is 20';
        return 'Tên người dùng quá dài, tối đa 20 kí tự';
      case 'USERNAME_INVALID':
        //return 'username only can be alphabetic none UTF-8 and number, start with alphabetic none-UTF8';
        return 'Tên người dùng chỉ có thể là và bắt đầu bằng chữ không dấu';
      case 'PASSWORD_TOO_SHORT':
        //return 'password to short, min is 8';
        return 'Mặt khẩu quá ngắn, tối thiểu 8 kí tự';
      case 'PASSWORD_TOO_LONG':
       //return 'password to long, max is 128';
        return 'Mật khẩu quá dài, tối đa 128 kí tự';
      case 'PASSWORD_INVALID':
        //return 'password must start with alphabetic';
        return 'Mật khẩu phải bắt đầu bằng một chữ cái';
      case 'PASSWORD_NOT_EQUAL':
        //return 'password not equals to confirmPassword';
        return 'Mật khẩu không trùng với xác nhận mật khẩu';
      case 'LASTNAME_TOO_SHORT':
        //return 'lastName to short, min is 3';
        return 'Tên quá ngắn, tối thiểu 3 kí tự';
      case 'LASTNAME_TOO_LONG':
        //return 'lastName to long, max is 20';
        return 'Tên quá dài, tối đa 20 kí tự';
      case 'LASTNAME_INVALID':
        //return 'lastName only can be alphabetic utf8, number and dot, must start with alphabetic uft8';
        return 'Tên phải bắt đầu bằng chữ cái có dấu và chỉ có thể bao gồm chữ có dấu, số và dấu chấm';
      case 'FIRSTNAME_TOO_SHORT':
        //return 'firstName to short, min is 3';
        return 'Họ quá ngắn, tối thiểu 3 kí tự';
      case 'FIRSTNAME_TOO_LONG':
        //return 'firstName to long, max is 20';
        return 'Họ quá dài, tối đa 20 kí tự';
      case 'FIRSTNAME_INVALID':
        //return 'firstName only can be alphabetic utf8, number and dot, must start with alphabetic utf8';
        return 'Họ phải bắt đầu bằng chữ cái có dấu và chỉ có thể bao gồm chữ có dấu, số và dấu chấm';
      case 'ADDRESS_TOO_SHORT':
        //return 'address to short, min is 6';
        return 'Địa chỉ quá ngắn, tối thiểu là 6 kí tự';
      case 'ADDRESS_TOO_LONG':
        //return 'address to long, max is 100';
        return 'Địa chỉ quá dài, tối đa 100 kí tự';
      case 'PHONENUMBER_CONFLICT':
        //return 'phoneNumber already used by other people';
        return 'Số điện thoại đã được dùng bởi tài khoản khác';
      case 'PHONENUMBER_TOO_SHORT':
        //return 'phoneNumber to short, min is 3';
        return 'Số điện thoại quá ngắn, tối thiểu 3 kí tự';
      case 'PHONENUMBER_TOO_LONG':
        //return 'phoneNumber to long, max is 20';
        return 'Số điện thoại quá dài, tối đa 20 kí tự';
      case 'PHONENUMBER_INVALID':
        //return 'phoneNumber only can be number or number with 1 plus at start';
        return 'Số điện thoại chỉ có thể bao gồm số và bắt đầu từ 1';
      case 'CITIZENIDENTIFICATIONID_CONFLICT':
        //return 'citizenIdentificationId already used by other people';
        return 'CMND/CCCD đã được sử dụng bởi tài khoản khác';
      case 'CITIZENIDENTIFICATIONID_TOO_SHORT':
        //return 'citizenIdentificationId to short, min is 5';
        return 'CMND/CCCD quá ngắn, tối thiểu là 5 kí tự';
      case 'DATEOFBIRTH_INVALID':
        //return 'Invalid dateOfBirth, can only DD/MM/YYYY';
        return 'Ngày sinh không đúng định dạng DD/MM/YYYY';
      case 'ACTIVECODE_INVALID':
        //return 'Invalid activeCode';
        return 'Mã kích hoạt không hợp lệ';
      case 'FORGOTCODE_INVALID':
        //return 'Invalid forgotCode';
        return 'Mã khôi phục mật khẩu không hợp lệ';
      case 'VERIFYCODE_INVALID':
        //return 'Invalid or wrong verifyCode';
        return 'Mã xác nhận không hợp lệ';
      case 'USER_NOT_FOUND':
        //return 'User not exists';
        return 'Người dùng không tồn tại';
      case 'USER_NOT_UPLOAD_ID':
        //return 'User not upload image(s) of id card yet!';
        return 'Người dùng chưa xác nhận hình ảnh thẻ CMND/CCCD';
      case 'LOGIN_INVALID':
        //return 'Wrong login name or password';
        return 'Sai tên người dùng hoặc mật khẩu';
      case 'EMAIL_VERIFIED':
        //return 'User already verified email';
        return 'Người dùng đã xác minh email';
      case 'ACTIVE_SENT':
        //return 'Email has been sent to your inbox, please wait 5 minutes to use resend again';
        return 'Email đã được gửi đi, vui lòng chờ 5 phút để thực hiện gửi lại';
      case 'ISSUEDATE_INVALID':
        //return 'Invalid issueDate, can only DD/MM/YYYY';
        return 'Ngày cấp không đúng định dạng DD/MM/YYYY';
      case 'IDENTIFICATIONTYPE_INVALID':
        //return 'Invalid identificationType, can only be CMND or CCCD';
        return 'Loại chứng minh thư không hợp lệ, chứng minh thư chỉ có thể là CMND/CCCD';
      case 'ENABLE2FA_INVALID':
        //return 'Invalid enable2fa, can only be 0 or 1';
        return 'Kích hoạt xác minh 2 bước không thành công';
      case 'PENDING':
       //return 'Please wait for the staff approve your citizenIdentificationId';
        return 'Xin vui lòng chờ nhân viên xác nhận ảnh chứng minh thư';
      case 'USER_BLOCKED':
        //return 'Your account has been blocked, please contact the staff for more info';
        return 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ nhân viên để biết thêm chi tiết';
      case 'USER_NOT_VERIFY':
        //return 'This user not verify citizenIdentification Id yet';        
        return 'Người dùng chưa xác minh bằng chứng minh thư';        
      default:
        return 'Đã có lỗi xảy ra';
    }
  }
}

