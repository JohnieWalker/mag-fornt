import { EventEmitter, Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import 'rxjs';
import User from './user.model';
import { ApiService } from './api.service';

@Injectable()
export class UserProfileService {

  public userSuccessfullySignedIn = new EventEmitter<string>();

  private _userName: string;

  constructor(private http: Http, private apiService: ApiService) {
    this._userName = 'Loading...';
  }

  public signIn(user: User) {

    let urlSearchParams = new URLSearchParams();
    let options = new RequestOptions({withCredentials: true});
    urlSearchParams.append('username', user.ldap);
    urlSearchParams.append('password', user.password);
    console.log("DUB : " + urlSearchParams);
    return this.http
      .post(this.apiService.loginUrl, urlSearchParams, options)
      .map((response: Response) => response.json())
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  public signOut() {
    let urlSearchParams = new URLSearchParams();
    let options = new RequestOptions({withCredentials: true});

    return this.http
      .post(this.apiService.logoutUrl, urlSearchParams, options)
      .map((response: Response) => {response.json(); console.log("LOGGG : " + response.json)})
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  public checkIfUserHasAdminRights() {

    const subject = new Subject<boolean>();

    this.http
      .head(this.apiService.adminUrl, {withCredentials: true})
      .timeout(5000)
      .subscribe(
        res => subject.next(true),
        error => subject.next(false)
      );

    return subject.asObservable().first();
  }

  public isUserLoggedIn(): Observable<boolean> {

    const subject = new Subject<boolean>();
    
    this.http
      .head(this.apiService.authoritiesUrl)
      .timeout(5000)
      .subscribe(
        res => subject.next(true),
        error => {subject.next(true);console.log("ERROR HEAD : " + error);}
      );

    return subject.asObservable().first();
  }

  get username() {
    return this._userName;
  }

  set username(displayName: string) {
    this._userName = displayName;
  }
}
