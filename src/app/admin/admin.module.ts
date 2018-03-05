import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateBucketComponent } from './buckets-management/create-bucket/create-bucket.component';
import { BucketsManagementComponent } from './buckets-management/buckets-management.component';
import { DbManagementComponent } from './db-management/db-management.component';
import { ManageBucketsComponent } from './db-management/manage-buckets/manage-buckets.component';
import { BucketsListComponent } from './db-management/manage-buckets/buckets-list/buckets-list.component';
import { ManageGroupsComponent } from './db-management/manage-groups/manage-groups.component';
import { GroupsListComponent } from './db-management/manage-groups/groups-list/groups-list.component';
import { GroupsCreateUpdateComponent } from './db-management/manage-groups/groups-create-update/groups-create-update.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, CreateBucketComponent, BucketsManagementComponent, DbManagementComponent, ManageBucketsComponent, BucketsListComponent, ManageGroupsComponent, GroupsListComponent, GroupsCreateUpdateComponent]
})
export class AdminModule { }
