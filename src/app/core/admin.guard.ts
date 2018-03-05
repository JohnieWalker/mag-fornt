import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { Subject } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private userProfileService: UserProfileService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const authenticated = this.userProfileService.checkIfUserHasAdminRights();
    const subject = new Subject();

    authenticated.subscribe(
      (isAdmin) => {
        if (!isAdmin) {
          this.router.navigateByUrl('/');
          subject.next(false);
        }
        subject.next(true);
      }
    );
    return subject.asObservable().first();
  }
}
