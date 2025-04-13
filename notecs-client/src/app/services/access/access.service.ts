import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  baseApi = environment.apiUrl
  constructor(private http:HttpClient) { }

  register(name:string, email:string, password:string):Promise<any>{
    let body = {
      name: name, 
      email: email, 
      password: password
    }
    return firstValueFrom(this.http.post(this.baseApi + 'users', body));
  }

  login(email:string, password:string):Promise<any>{
    let body = {
      username: email, 
      password: password
    }
    return firstValueFrom(this.http.post(this.baseApi + 'auth/login', body));
  }

}
