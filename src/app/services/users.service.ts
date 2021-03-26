import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UsersServiceResponse {
  status: number;
  error?: { msg: string };
  payload?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  addUser(user: User): Observable<UsersServiceResponse> {
    return this.httpClient.post('https://demo-api.now.sh/users', user).pipe(
      map((body) => ({
        status: 200,
        payload: body,
      })),
      catchError(this.handleError)
    );
  }

  private handleError(
    err: HttpErrorResponse
  ): Observable<UsersServiceResponse> {
    return of({ status: err.status, error: { msg: err.statusText } });
  }
}
