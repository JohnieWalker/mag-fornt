import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Group } from './../group.model';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GroupService } from './../../../../core/group.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bms-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit, OnDestroy {

  @Input() groups: Group[];
  @Output() groupClickAction: EventEmitter<any> = new EventEmitter();

  public newGroupForm: FormGroup;

  private getGroupsSubscription: Subscription;
  private getNewGroupSubscription: Subscription;
  private getGroupChangedSubscription: Subscription;

  constructor(private groupService: GroupService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    this.getGroupsSubscription = this.groupService
      .getGroups()
      .subscribe((groups: Group[]) => {
        this.groups = groups
      });

    this.getNewGroupSubscription = this.groupService.groupWasCreated.subscribe(
      (group: Group) => { this.groups.push(group) });

    this.getGroupChangedSubscription = this.groupService.groupWasChanged.subscribe(
      group => { this.groups[this.findGroupByName(this.groups, group.name)] = group; });

  }

  private findGroupByName(arr: any[], groupName: string) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === groupName) {
        return i;
      }
    }
  }

  private initForm() {
    this.newGroupForm = this.formBuilder.group({
      groupName: [null, Validators.required],
      buckets: this.formBuilder.array([this.initBuckets()])
    });
  }

  private initBuckets() {
    return this.formBuilder.group({
      bucket: [null, Validators.required],
    });
  }

  showBucketsOfGroup(group: Group) {
    this.groupClickAction.emit(group);
    this.groupService.groupWasClicked.emit(group.buckets.length);
  }

  deleteGroup(group: Group, event?) {
    event.stopPropagation();

    const deleteFlag = confirm(`Are you sure you want delete group ${group.name}?`);

    if (!deleteFlag) {
      return;
    }

    this.groupService.deleteGroup(group.name, group.buckets).subscribe(
      group => { this.groups.splice(this.findGroupByName(this.groups, group.name), 1); this.groupService.groupWasDeleted.emit() },
      error => this.groupService.groupDeleteError.emit(error)
    );
  }

  ngOnDestroy() {
    this.getGroupsSubscription.unsubscribe();
    this.getGroupChangedSubscription.unsubscribe();
    this.getNewGroupSubscription.unsubscribe();
  }

}
