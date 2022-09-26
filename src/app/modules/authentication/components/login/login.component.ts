import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  passwordShown:boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  createUser = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  // submit() {
  //   this.router.navigate(["performance"])
       
  //   }
  


  togglePassword(){
    if(this.passwordShown){
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

  login(){
    this.router.navigate(["performance/performance"])
  }


}
