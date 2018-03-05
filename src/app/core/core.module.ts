import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ApiService } from './api.service';
import { UserProfileService } from './user-profile.service';
import { BucketService } from './bucket.service';
import { GroupService } from './group.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [ApiService, UserProfileService, BucketService, GroupService, AuthGuard, AdminGuard]
})
export class CoreModule {
}
