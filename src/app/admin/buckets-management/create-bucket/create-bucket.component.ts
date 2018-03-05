import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BucketService } from '../../../core/bucket.service';

@Component({
  selector: 'bms-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.css']
})
export class CreateBucketComponent implements OnInit {

  public createBucketForm: FormGroup;
  public error: Error;

  public isBucketNameActive = true;
  public isAccountIdActive = false;
  public isIndexPageActive = false;
  public isErrorPageActive = false;
  public isCreationSuccessfull = false;

  constructor(private formBuilder: FormBuilder, private bucketService: BucketService, private router: Router) {
  }

  ngOnInit() {
    this.createBucketForm = this.formBuilder.group({
      bucketName: [null, [Validators.required, Validators.pattern(/^bms-.*/)]],
      accountId: [null, Validators.required],
      isSite: false,
      isPublic: false,
      indexPage: null,
      errorPage: null
    });
  }

  public activateBucketNameInput() {
    this.isBucketNameActive = true;
  }

  public deactivateBucketNameInput() {
    if (!this.createBucketForm.value.bucketName) {
      this.isBucketNameActive = false;
    }
  }

  public activateAccountIdInput() {
    this.isAccountIdActive = true;
  }

  public deactivateAccountIdInput() {
    if (!this.createBucketForm.value.accountId) {
      this.isAccountIdActive = false;
    }
  }

  public activateIndexPageInput() {
    this.isIndexPageActive = true;
  }

  public deactivateIndexPageInput() {
    if (!this.createBucketForm.value.indexPage) {
      this.isIndexPageActive = false;
    }
  }

  public activateErrorPageInput() {
    this.isErrorPageActive = true;
  }

  public deactivateErrorPageInput() {
    if (!this.createBucketForm.value.errorPage) {
      this.isErrorPageActive = false;
    }
  }

  public onSubmit() {

    const { bucketName, accountId, isSite, isPublic, indexPage, errorPage } = this.createBucketForm.value;

    if (isSite) {

      this.bucketService
        .createSite(bucketName, accountId, indexPage, errorPage)
        .subscribe(
        response => { this.checkToPublishBucket(isPublic, bucketName) },
        error => this.handleError(error));
    } else {

      this.bucketService
        .createBucket(bucketName, accountId)
        .subscribe(
        response => { this.checkToPublishBucket(isPublic, bucketName) },
        error => this.handleError(error));
    }

  }

  private checkToPublishBucket(isPublic: boolean, bucketName: string) {

    if (isPublic) {
      this.bucketService
        .makeBucketPublic(bucketName).subscribe(
        bucket => { setTimeout(() => { }, 4000); },
        error => { this.handleError(error) }
        );
    }

    this.router.navigateByUrl('/');

  }

  private handleError(error: Error) {
    this.error = error;
    this.isCreationSuccessfull = true;
    setTimeout(() => { this.isCreationSuccessfull = false; this.error = null; }, 8000);
  }

}
