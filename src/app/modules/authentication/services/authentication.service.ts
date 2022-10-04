import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




@Injectable()
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  getVerifyRandomCodes(randomcode: any) {
    return this.http.get(environment.accessToken + "/users/varifyrandomcode/" + randomcode, { observe: 'response' })
  }

  
}
