import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, ReplaySubject, switchMap, tap, throwError } from "rxjs";
import { User } from "./user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string): Observable<User> {
    return this.http.post(
       'http://localhost:3000/auth/login',
       {username: username, password: password}
     ).pipe(
       catchError(this.handleError),
       map(res => {
        let user: User = { id: res.user.id, username: res.user.username, role: res.user.role, token: res.token};
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        return user;
      })
     )
  }

  public autoLogin(): void {
    const userData: User = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) {
      return;
    }
    const loadedUser = { id: userData.id, username: userData.username, role: userData.role, token: userData.token};
    this.user.next(loadedUser);
  }

  public logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['']);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let message = 'An unknown error occured!';
    if(!error.error || !error.error.error) {
      return throwError(() => message);
    }
    return throwError(() => message);
  }
}

