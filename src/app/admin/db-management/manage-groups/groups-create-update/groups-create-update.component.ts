import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { GroupService } from '../../../../core/group.service';

import { Subscription } from "rxjs";
import { Group } from './../group.model';

import { ManageGroupsUtils } from './../manage-groups.utils';

@Component({
  selector: 'bms-groups-create-update',
  templateUrl: './groups-create-update.component.html',
  styleUrls: ['./groups-create-update.component.css']
})
export class GroupsCreateUpdateComponent implements OnInit, OnDestroy {

  @Input() group: Group;

  public newGroupForm: FormGroup;

  public error: Error;

  public isCreationFormOpened: boolean = false;
  public isUpdateFormOpened: boolean = false;
  public isNewGroupNameInputActive: boolean = false;
  public isSuccessfullyCreated: boolean = false;
  public isSuccessfullyUpdated: boolean = false;
  public isSuccessfullyDeleted: boolean = false;
  public isUnsuccessfullAction: boolean = false;

  private groupWasClickedSubscription: Subscription;
  private groupNameWasChanged: Subscription;
  private groupWasDeleted: Subscription;
  private groupDeletingError: Subscription;

  private groupName: string;

  private defaultName: string = "";
  private defaultBuckets: string[] = [];
  private bucketsLabel = 'buckets';

  constructor(private groupService: GroupService, private formBuilder: FormBuilder) {
    this.groupWasClickedSubscription = this.groupService.groupWasClicked.subscribe(
      (length) => {
        this.hidePopUpMessage();
        this.initForm(this.group.name, this.group.buckets);
        this.initUpdateForm(length);
        this.isUpdateFormOpened = true;
        this.isCreationFormOpened = false;
        this.isNewGroupNameInputActive = true;
      });

    this.groupWasDeleted = this.groupService.groupWasDeleted.subscribe(
      () => {
        this.hidePopUpMessage();
        this.isSuccessfullyDeleted = true;
        this.isCreationFormOpened = false;
        this.isUpdateFormOpened = false;
        this.defaltDataInit();
        setTimeout(() => this.isSuccessfullyDeleted = false, 5000);
      }
    );

    this.groupDeletingError = this.groupService.groupDeleteError.subscribe(
      error => this.handleError(error)
    );
  }

  ngOnInit() {
    this.initForm(this.defaultName, this.defaultBuckets);
    this.defaltDataInit();
  }

  private defaltDataInit() {
    this.group = {
      name: this.defaultName,
      buckets: this.defaultBuckets
    }
  }

  private initForm(groupName?: string, buckets?: string[]) {
    this.newGroupForm = this.formBuilder.group({
      groupName: [groupName, Validators.required],
      buckets: this.formBuilder.array([this.initBuckets(buckets)])
    });
  }

  private initBuckets(buckets?: string[]) {
    return this.formBuilder.group({
      bucket: [buckets, Validators.required],
    });
  }

  private initUpdateForm(length: number) {
    for (let i = 0; i < length - 1; i++) {
      this.addBucketToNewGroup();
    }
  }

  addBucketToNewGroup() {
    const control = <FormArray>this.newGroupForm.controls[this.bucketsLabel];
    control.push(this.initBuckets());
  }

  removeBucketFromNewGroup(i: number) {
    const control = <FormArray>this.newGroupForm.controls[this.bucketsLabel];
    control.removeAt(i);
  }

  getValueOfBucket(i) {
    return this.group.buckets[i];
  }

  saveNewGroup(group: FormGroup) {
    let normalizedGroup = ManageGroupsUtils.normalizeGroup(group);

    if (this.isCreationFormOpened) {
      this.groupService.createGroup(normalizedGroup.name, normalizedGroup.buckets).subscribe(
        group => this.handleSaveNewGroup(group),
        error => this.handleError(error)
      );
    }

    if (this.isUpdateFormOpened) {
      this.groupService.updateGroup(normalizedGroup.name, normalizedGroup.buckets).subscribe(
        group => this.handleUpdateGroup(group),
        error => this.handleError(error)
      );
    }

  }

  ngOnDestroy() {
    this.groupWasClickedSubscription.unsubscribe();
    this.groupWasDeleted.unsubscribe();
    this.groupDeletingError.unsubscribe();
  }

  private handleSaveNewGroup(group: Group) {
    this.hidePopUpMessage();
    this.groupService.groupWasCreated.emit(group);
    this.group = null;
    this.closeCreationForm();
    this.closeUpdateForm();
    this.isSuccessfullyCreated = true;
    setTimeout(() => this.isSuccessfullyCreated = false, 5000);
  }

  private handleUpdateGroup(group: Group) {
    this.hidePopUpMessage();
    this.groupService.groupWasChanged.emit(group);
    this.group = null;
    this.closeCreationForm();
    this.closeUpdateForm();
    this.isSuccessfullyUpdated = true;
    setTimeout(() => this.isSuccessfullyUpdated = false, 5000);
  }

  private handleError(error: Error) {
    this.error = error;
    this.isUnsuccessfullAction = true;
    setTimeout(() => { this.isUnsuccessfullAction = false; this.error = null; }, 8000);
  }

  private openCreationForm() {
    this.hidePopUpMessage();
    this.isCreationFormOpened = true;
    this.isUpdateFormOpened = false;
    this.initForm(this.defaultName, this.defaultBuckets);
    this.defaltDataInit();
  }

  private closeCreationForm() {
    this.hidePopUpMessage();
    this.isCreationFormOpened = false;
    this.defaltDataInit();
  }

  private openUpdateForm() {
    this.hidePopUpMessage();
    this.isUpdateFormOpened = true;
    this.isCreationFormOpened = false;
  }

  private closeUpdateForm() {
    this.hidePopUpMessage();
    this.isUpdateFormOpened = false;
    this.defaltDataInit();
  }

  private activateNewGroupNameInput() {
    this.isNewGroupNameInputActive = true;
  }

  private deactivateNewGroupNameInput() {
    this.isNewGroupNameInputActive = false;
  }

  private hidePopUpMessage() {
    this.isSuccessfullyCreated = false;
    this.isSuccessfullyUpdated = false;
    this.isSuccessfullyDeleted = false;
    this.isUnsuccessfullAction = false;
  }

}
