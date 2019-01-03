import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'http://localhost:8000';
  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { params })
     .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.API_URL}${path}`, body)
    .pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${this.API_URL}${path}`, body)
    .pipe(catchError(this.formatErrors));
  }

  delete(path: string, body: Object = {}): Observable<any> {

    const httpOptions = { headers: null, body: body }

    return this.http.delete(
      `${this.API_URL}${path}`, httpOptions
    ).pipe(catchError(this.formatErrors));
  }
}
