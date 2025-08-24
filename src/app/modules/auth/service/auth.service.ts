import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signupApiCall(payLoad:any){
    return this.http.post('signupUrl', payLoad)
  }

  loginApiCall(payLoad:any){
    return this.http.post('login', payLoad)
  }
}
