import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { Subject } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userProfileService: UserProfileService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const authenticated = this.userProfileService.isUserLoggedIn();
    const subject = new Subject();

    authenticated.subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
          subject.next(false);
        }
        subject.next(true);
      }
    );
    return subject.asObservable().first();
  }
}
