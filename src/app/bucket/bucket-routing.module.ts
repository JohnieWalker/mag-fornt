import {RouterModule, Routes} from "@angular/router";
import {BucketInfoComponent} from "./bucket-info/bucket-info.component";
import {ModuleWithProviders} from "@angular/core";

const BUCKET_ROUTES: Routes = [
  {path: ':name', component: BucketInfoComponent}
];

export const BucketRoutingModule: ModuleWithProviders = RouterModule.forChild(BUCKET_ROUTES);
