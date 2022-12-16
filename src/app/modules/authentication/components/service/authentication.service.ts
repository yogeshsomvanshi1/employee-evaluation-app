import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  login(data): Observable<any> {
    return this.http.post(environment.accessToken + '/auth/api/token/', data);
  }
  getVerifyRandomCodes(randomcode: any) {
    return this.http.get(environment.accessToken + "/users/varifyrandomcode/" + randomcode, { observe: 'response' })
  }

  PostChangePasswordWithRandomString(data) {
    return this.http.post(environment.accessToken + "/users/changePasswordWithRandomString", data);
  }

  getForgotPasswords(email: any): Observable<any> {
    return this.http.get(environment.accessToken + "/users/forgetPassword/" + email)
  }
  adminLogin(data): Observable<any> {
    return this.http.post(environment.accessToken + '/token/admin/accessToken', data);
  }
}
