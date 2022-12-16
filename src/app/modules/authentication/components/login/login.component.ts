import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'ath-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {
  invalidUser: boolean = false;
  passwordType: string = 'password';
  passwordShown: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  createUser = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)])
  })

  get loginFormControl(): { [key: string]: AbstractControl } {
    return this.createUser.controls;
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    }
    else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  ngOnInit(): void {

  }

  submit() {    
    this.authenticationService.login(this.createUser.value).subscribe((data: any) => {
      sessionStorage.setItem('username', this.createUser.get('username').value);
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('session_id', data.session_state);
      sessionStorage.setItem('emp_code', data.emp_code);
      
      // sessionStorage.setItem('userDetails', JSON.stringify(data));
      // sessionStorage.setItem('userId', data.userId);
      this.router.navigate(["performance/performance"]);
    }, error => {
      if (error.status == 428) {
        sessionStorage.setItem('username', this.createUser.get('username').value);
        this.router.navigate([""], { queryParams: { content: '' } })
      }
      else {
        this.invalidUser = true;
      }
    }
    );
  }

}
