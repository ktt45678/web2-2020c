import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  hidePassword = true;
  registerForm;
  ngOnInit(): void {}
  constructor(private user: UserService, private formBuilder: FormBuilder) {
    this.registerForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'birth': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'tel': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'confirmpassword': new FormControl('', [Validators.required])
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get birth() { return this.registerForm.get('birth'); }
  get username() { return this.registerForm.get('username'); }
  get tel() { return this.registerForm.get('tel'); }
  get address() { return this.registerForm.get('address'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmpassword() { return this.registerForm.get('confirmpassword'); }

  onSubmit(registerData) {
    //this.registerForm.reset();
    this.loading = true;
    console.log(registerData);
  }

  Register() {
    this.user.login('admin123@admin.com', 'kocopass').subscribe(data => {
      console.log(data);
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
