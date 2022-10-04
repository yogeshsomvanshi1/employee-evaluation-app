import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'ath-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  invalidUser : boolean = false;
  passwordType: string = 'password';
  passwordShown:boolean = false;
  constructor(private router:Router, private service : AuthenticationService) { }

  ngOnInit(): void {
  }

  createAdmin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  })

  submit(){
    this.service.adminLogin(this.createAdmin.value).subscribe((data:any)=>{
      sessionStorage.setItem('username', this.createAdmin.get('username').value);      
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('session_id', data.session_state); 
      sessionStorage.setItem('dataProp','crmAdminLogin');
      sessionStorage.setItem('userDetails',JSON.stringify(data));
      sessionStorage.setItem('userisAdmin','admin');
      sessionStorage.setItem("HeaderClass", "top_dark");
      this.router.navigate(["/uam/uam"], {queryParams:{prop: 'crmAdminLogin'}})
    }, error => {
      this.invalidUser = true;
      // alert("Error while logging infdgd.")
    })
      // this.router.navigate(["crm"])
  }
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


  loginAdmin(){
    this.router.navigate(['performance/performance'])
  }

}



