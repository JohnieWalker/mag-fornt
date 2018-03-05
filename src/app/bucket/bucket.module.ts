import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketInfoComponent } from './bucket-info/bucket-info.component';
import { BucketRoutingModule } from './bucket-routing.module';
import { ObjectsListComponent } from './bucket-info/objects-list/objects-list.component';
import { ObjectComponent } from './bucket-info/object/object.component';
import { BreadcrumbsComponent } from './bucket-info/breadcrumbs/breadcrumbs.component';
import { ObjectSearchComponent } from './bucket-info/object-search/object-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './bucket-info/upload/upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NoPrefixPipe } from './bucket-info/object/no-prefix.pipe';
import { OrderByFoldersPipe } from './bucket-info/order-by-folders.pipe';

@NgModule({
  imports: [
    CommonModule,
    BucketRoutingModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [BucketInfoComponent, ObjectsListComponent, ObjectComponent, BreadcrumbsComponent, ObjectSearchComponent, UploadComponent, NoPrefixPipe, OrderByFoldersPipe]
})
export class BucketModule {
}
