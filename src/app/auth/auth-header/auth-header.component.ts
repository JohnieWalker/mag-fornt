import {Component, OnDestroy, OnInit} from '@angular/core';
import {authHeaderAnimation} from "./animations";
import {UserProfileService} from "../../core/user-profile.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'bms-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
  animations: [authHeaderAnimation]
})
export class AuthHeaderComponent implements OnInit, OnDestroy {

  public authHeaderState: string = 'visible';

  private userSignedInSubscription: Subscription;

  constructor(private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userSignedInSubscription = this.userProfileService
      .userSuccessfullySignedIn
      .subscribe(() => this.authHeaderState = 'void');
  }

  ngOnDestroy() {
    this.userSignedInSubscription.unsubscribe();
  }

}
