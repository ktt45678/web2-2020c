import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birth: ['', Validators.required],
      username: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onSubmit(registerData) {
    //this.registerForm.reset();
    console.log(registerData.firstname);
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
