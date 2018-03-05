import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { WatcherComponent } from './watcher/watcher.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';

const BMS_ROUTES: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signin', loadChildren: 'app/auth/auth.module#AuthModule'},
  {path: 'bucket', loadChildren: 'app/bucket/bucket.module#BucketModule', canActivate: [AuthGuard]},
  {path: 'admin-page', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuard, AdminGuard]},
  {path: 'watcher.html', component: WatcherComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

export const BmsRoutingModule: ModuleWithProviders = RouterModule.forRoot(BMS_ROUTES);
