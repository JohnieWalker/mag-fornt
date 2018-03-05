import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BucketService} from "../../../../core/bucket.service";
import {BucketWithAccountId} from "../bucket-with-accountid.model";

@Component({
  selector: 'bms-buckets-list',
  templateUrl: './buckets-list.component.html',
  styleUrls: ['./buckets-list.component.css']
})
export class BucketsListComponent implements OnInit {

  @Input() accountId: string;
  @Input() buckets: string[];
  @Output() bucketHasBeenDeleted = new EventEmitter<BucketWithAccountId>();
  @Output() bucketHasBeenAdded = new EventEmitter<BucketWithAccountId>();

  public newBucketForm: FormGroup;
  public isNewBucketNameInputActive = false;
  public isNewBucketAccountIdInputActive = false;
  public isAddFormOpened = false;

  constructor(private bucketService: BucketService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newBucketForm = this.formBuilder.group({
      bucketName: [null, Validators.required],
      accountId: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^\d+$/)]]
    });
  }

  deleteBucket(bucketName: string, bucketAccountId: string) {

    const deleteFlag = confirm(`Are you sure you want delete bucket ${bucketName}?`);

    if (!deleteFlag) {
      return;
    }

    this.bucketService.deleteBucketWithAccountId(bucketName, bucketAccountId)
      .subscribe((bucketWithAccountId: BucketWithAccountId) => this.bucketHasBeenDeleted.emit(bucketWithAccountId));
  }

  public activateNewBucketNameInput() {
    this.isNewBucketNameInputActive = true;
  }

  public deactivateNewBucketNameInput() {
    if (!this.newBucketForm.value.bucketName) {
      this.isNewBucketNameInputActive = false;
    }
  }

  public openAddForm() {
    this.isAddFormOpened = true;
  }

  public onSubmit() {

    const bucketName = this.newBucketForm.value.bucketName;

    this.bucketService.createBucketWithAccountId(bucketName, this.accountId)
      .subscribe((bucketWithAccountId: BucketWithAccountId) => {
        this.bucketHasBeenAdded.emit(bucketWithAccountId);
        this.newBucketForm.controls['bucketName'].patchValue('');
        this.isAddFormOpened = false;
      });
  }

}
