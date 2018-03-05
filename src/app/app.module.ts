import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { BmsRoutingModule } from './app-routing.module';
import { BucketSearchComponent } from './home/bucket-search/bucket-search.component';
import { WatcherComponent } from './watcher/watcher.component';
import { BucketListComponent } from './home/bucket-list/bucket-list.component';
import { FilterNamePipe } from './home/bucket-list/filter-name.pipe';
import { HighlightPipe } from './home/bucket-list/highlight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BucketSearchComponent,
    WatcherComponent,
    BucketListComponent,
    FilterNamePipe,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    BmsRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
