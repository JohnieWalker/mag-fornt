import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BucketService} from "../../../core/bucket.service";
import {Object} from "../../object.model";

@Component({
  selector: 'bms-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  @Input() bucketName: string;
  public queryParamsReaderSubscription: Subscription;
  public folders: string;

  constructor(private route: ActivatedRoute, private bucketService: BucketService, private router: Router) {
  }

  ngOnInit() {
    this.queryParamsReaderSubscription = this.route
      .queryParams
      .subscribe(
        (queryParams) =>
          this.folders = queryParams['prefix'] ? queryParams['prefix'].split('/').filter(Boolean) : []
      );
  }

  ngOnDestroy() {
    this.queryParamsReaderSubscription.unsubscribe();
  }

  getObjects(prefix: string) {
    this.bucketService
      .fetchObjects(this.bucketName, prefix)
      .subscribe(
        (objects: Object[]) => {
          this.bucketService.objectsListChanged.emit(objects);
          this.router.navigate(['/bucket', this.bucketName], {queryParams: {prefix: prefix}});
        }
      );
  }
}
