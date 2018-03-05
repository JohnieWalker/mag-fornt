import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { signinCardAnimation, toastAnimation } from "./animations";
import { UserProfileService } from "../../core/user-profile.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import User from "../../core/user.model";

@Component({
  selector: 'bms-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [signinCardAnimation, toastAnimation]
})
export class SigninComponent implements OnInit {

  public isLdapInputActive: boolean = true;
  public isPasswordInputActive: boolean = false;
  public signinStatus: string = 'none';
  public signinErrorMessage: string;
  public signinForm: FormGroup;

  public toastState: string = 'hidden';
  public signinCardState: string = 'visible';

  private returnUrl: string;

  @ViewChild('adPasswordInput') adPasswordInput: ElementRef;

  constructor(private formBuilder: FormBuilder, private userProfileService: UserProfileService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.userProfileService
      .isUserLoggedIn()
      .subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
        }
      }
      );
  }

  private initForm(): void {
    this.signinForm = this.formBuilder.group({
      'ldap': [null, Validators.required],
      'ad_password': [null, Validators.required]
    });
  }

  public activateLdapInput(): void {
    this.isLdapInputActive = true;
  }

  public deactivateLdapInput(): void {
    if (!this.signinForm.value.ldap) {
      this.isLdapInputActive = false;
    }
  }

  public activatePasswordInput(): void {
    this.isPasswordInputActive = true;
  }

  public deactivatePasswordInput(): void {
    if (!this.signinForm.value.ad_password) {
      this.isPasswordInputActive = false;
    }
  }

  public onSubmit(): void {
    this.signinStatus = 'inprogress';
    const { ldap, ad_password } = this.signinForm.value;

    const user = new User(ldap, ad_password);

    this.userProfileService.signIn(user)
      .subscribe(
      data => {console.log("LOGGED TRUEEEE : " + data);this.handleSuccessLogin(data)},
      error => {console.log("LOGGED FALSEE : " + error);this.handleSigninError(error.message)}
      )
  }

  private handleSuccessLogin(data: any): void {
    this.userProfileService.userSuccessfullySignedIn.emit(data.displayName);
    localStorage.setItem('username', data.displayName);
    this.signinStatus = 'success';
    this.signinCardState = 'void';
    setTimeout(() => this.router.navigateByUrl(this.returnUrl), 800);
  }

  private handleSigninError(errorMessage: string): void {
    this.showErrorToast(errorMessage);
    this.signinForm.patchValue({ 'ad_password': null });
    this.adPasswordInput.nativeElement.focus();
    this.signinStatus = 'none';
  }

  private showErrorToast(errorMessage: string): void {
    this.signinErrorMessage = errorMessage;
    this.toastState = 'visible';
    setTimeout(() => this.toastState = 'hidden', 5000);
  }

}
