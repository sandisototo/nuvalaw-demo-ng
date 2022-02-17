import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { User } from './_models';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;

  constructor(private _router: Router, private http: HttpClient) {
    // this.userSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('user'))
    // );
    // this.user = this.userSubject.asObservable();
  }

  // public get userValue(): User {
  //   return this.userSubject.value;
  // }

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }

  public login(username: string, password: string): Observable<void> {
    const authString = window.btoa(username + ':' + password)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: false
    };
    
    return from(
      this.http.get<any>(`${environment.apiUrl}/user/get-current`, httpOptions)
    ).pipe(
      map((user) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = authString;
        localStorage.setItem('user', JSON.stringify(user));
        this._authSub$.next(true);
      })
    );
  }

  public logout(redirect: string) {
    localStorage.removeItem('user');
    // this.userSubject.next(this.user);
    this._authSub$.next(false);
    this._router.navigate([redirect])
  }

}
