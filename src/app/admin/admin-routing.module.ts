import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ModuleWithProviders } from '@angular/core';
import { CreateBucketComponent } from './buckets-management/create-bucket/create-bucket.component';
import { ManageBucketsComponent } from './db-management/manage-buckets/manage-buckets.component';
import { ManageGroupsComponent } from './db-management/manage-groups/manage-groups.component';

const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'buckets-management',
    children: [
      { path: 'create', component: CreateBucketComponent }
    ]
  },
  {
    path: 'db-management',
    children: [
      { path: 'buckets', component: ManageBucketsComponent },
      { path: 'groups', component: ManageGroupsComponent }
    ]
  }
];

export const AdminRoutingModule: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
