import { Component, OnInit } from '@angular/core';
import {UserProfileService} from "../user-profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName: string = localStorage.getItem('username');
  public isUsermenuActive = false;
  public isUserHasAdminRights = false;

  constructor(private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit() {
    this.userProfileService
      .userSuccessfullySignedIn
      .map(username => this.userName = username)
      .flatMap(() => this.userProfileService.checkIfUserHasAdminRights())
      .subscribe(userIsAdmin => this.isUserHasAdminRights = userIsAdmin);

    this.userProfileService
      .checkIfUserHasAdminRights()
      .subscribe(userIsAdmin => this.isUserHasAdminRights = userIsAdmin);
  }

  logout() {
    this.isUsermenuActive = false;
    this.userProfileService.signOut().subscribe(
      () => {
        localStorage.removeItem('username');
        this.router.navigateByUrl('/signin')
      },
      error => this.router.navigateByUrl('/signin')
    );
  }

  public activateUsermenu() {
    this.isUsermenuActive = true;
  }

  public deactivateUsermenu() {
    this.isUsermenuActive = false;
  }
}
