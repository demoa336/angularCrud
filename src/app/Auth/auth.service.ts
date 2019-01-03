import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL  =  'http://localhost:8000';
  constructor(private  httpClient:  HttpClient) { }

  public signUp(user: any) {
	return this.httpClient.post(`${this.API_URL}/api/register`, user).pipe(map(
	  data => {
		this.setAuth(data);
		return data;
	  }
	));
  }

  public login(user: any) {
	return this.httpClient.post(`${this.API_URL}/api/login`, user).pipe(map(
	  data => {
		this.setAuth(data);
		return data;
	  }
	));
  }

  public logout(user: any) {
	localStorage.removeItem("token");
  }

  private setAuth(user: any) {
	localStorage.setItem("token", user.access_token);
  }

  public getToken() {
  	if(this.isAuthenticated()) return localStorage.token;

  	return null;
  }

  public isAuthenticated() {
	var token = localStorage.token;
	if(token) return true;

	return false;
  }
}
