import { Component, OnDestroy, OnInit } from '@angular/core';
import { BucketService } from '../../../core/bucket.service';
import { Subscription } from 'rxjs/Subscription';
import { AccountIdWithBucketsList, BucketWithAccountId } from './bucket-with-accountid.model';
import { ManageBucketsUtils } from './manage-buckets.utils';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'bms-manage-buckets',
  templateUrl: './manage-buckets.component.html',
  styleUrls: ['./manage-buckets.component.css']
})
export class ManageBucketsComponent implements OnInit, OnDestroy {

  public accountIdsWithBucketsList: AccountIdWithBucketsList[] = [];
  public isNewBucketNameInputActive = false;
  public isNewBucketAccountIdInputActive = false;
  public newBucketForm: FormGroup;
  public isAddFormOpened = false;

  private fetchingBucketsSubscription: Subscription;

  constructor(private bucketService: BucketService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.initForm();

    this.fetchingBucketsSubscription = this.bucketService
      .fetchBucketsWithAccountIds()
      .subscribe((bucketsWithAccountId: BucketWithAccountId[]) => {
        this.accountIdsWithBucketsList = ManageBucketsUtils.transformToAccountIdWithBucketsList(bucketsWithAccountId);
      });
  }

  initForm() {
    this.newBucketForm = this.formBuilder.group({
      bucketName: [null, Validators.required],
      accountId: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^\d+$/)]]
    });
  }

  public deleteBucketFromView(bucketWithAccountId: BucketWithAccountId) {
    this.accountIdsWithBucketsList = ManageBucketsUtils.deleteBucketFromAccount(this.accountIdsWithBucketsList, bucketWithAccountId);
  }

  public addBucketToView(bucketWithAccountId: BucketWithAccountId) {
    this.accountIdsWithBucketsList = ManageBucketsUtils.addBucketToList(this.accountIdsWithBucketsList, bucketWithAccountId);
  }

  ngOnDestroy() {
    this.fetchingBucketsSubscription.unsubscribe();
  }

  openAddForm() {
    this.isAddFormOpened = true;
  }

  public activateNewBucketNameInput() {
    this.isNewBucketNameInputActive = true;
  }

  public deactivateNewBucketNameInput() {
    if (!this.newBucketForm.value.bucketName) {
      this.isNewBucketNameInputActive = false;
    }
  }

  public activateNewBucketAccountIdInput() {
    this.isNewBucketAccountIdInputActive = true;
  }

  public deactivateNewBucketAccountIdInput() {
    if (!this.newBucketForm.value.accountId) {
      this.isNewBucketAccountIdInputActive = false;
    }
  }

  onSubmit() {

    const { bucketName, accountId } = this.newBucketForm.value;

    this.bucketService.createBucketWithAccountId(bucketName, accountId)
      .subscribe((bucketWithAccountId: BucketWithAccountId) => {
        this.addBucketToView(bucketWithAccountId);
        this.newBucketForm.controls['bucketName'].patchValue('');
        this.newBucketForm.controls['accountId'].patchValue('');
        this.isAddFormOpened = false;
      });
  }

}
