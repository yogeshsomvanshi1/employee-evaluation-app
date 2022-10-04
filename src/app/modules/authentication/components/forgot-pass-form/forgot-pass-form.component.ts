
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SweetalertServiceService } from 'src/app/modules/shared/component/sweetalert/sweetalert-service.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'ath-forgot-pass-form',
  templateUrl: './forgot-pass-form.component.html',
  styleUrls: ['./forgot-pass-form.component.scss']
})
export class ForgotPassFormComponent implements OnInit {

  badRequest: boolean = true;
  accessToken:any;
  roles:any=[];
  options:any;
  randomCode:any;
  private parameter: any;
  randomcodesuccess:number=0; 
  passwordType: string = 'password';
  passwordShown:boolean = false;
  passwordType1: string = 'password';
  passwordShown1:boolean = false;

  ForgotPassword = new FormGroup({})

  formValue:any = {};

  
  constructor(private service:AuthenticationService, 
    private http: HttpClient, private fb: FormBuilder, private route:ActivatedRoute,private alertService: SweetalertServiceService) { 

      this.ForgotPassword = fb.group({ 
        newPassword : new FormControl('', [Validators.required]),
        oldpassword  :new FormControl('', [Validators.required]),
        randomCode : new FormControl('')

      }, {  
        validator: ConfirmedValidator('newPassword','oldpassword' )
      })
  }
  
  ngOnInit(): void {
  


    this.route.queryParams.subscribe((param:any)=>{
      this.parameter = param;   
    })
    //  
    this.service.getVerifyRandomCodes(this.parameter.verificationCode).subscribe((success)=>{
      this.randomcodesuccess=success.status;
          
      if(this.randomcodesuccess==200){
        this.badRequest=false;
      }

     
    })
  }

  // fetchToken = new FormGroup({
  //   username : new FormControl('mary.harry@avisys.in'),
  //   password : new FormControl('Mary@123'),
  // });


  // ForgotPassword = new FormGroup({
  //   newPassword : new FormControl('', Validators.required),
  //   confirmPassword  :new FormControl('', Validators.required),
  //   randomCode : new FormControl('')
  // }
  // );

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

  togglePassword1(){
    if(this.passwordShown1){
      this.passwordShown1 = false;
      this.passwordType1 = 'password';

    }
    else {
      this.passwordShown1 = true;
      this.passwordType1 = 'text';
    }
  }  



  submit(){

    this.ForgotPassword.get('randomCode').setValue(this.parameter.verificationCode);   
    this.service.PostChangePasswordWithRandomString(this.ForgotPassword.value).subscribe((res)=>{      
      this.alertService.passwordChanged('login');
    }, error =>{
    })
  }

  extractRandomCode(ranomcode:string){
    const myArray = ranomcode.split(":");
    this.randomCode = myArray[1];
    alert(this.randomCode+" : random");
     
  }

  get oldpassword(){
    return this.ForgotPassword.get('oldpassword');
  }
  get newPassword(){
    return this.ForgotPassword.get('newPassword');
  }



}
function ConfirmedValidator(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

