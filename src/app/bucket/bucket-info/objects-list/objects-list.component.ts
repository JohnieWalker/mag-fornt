import { Component, Input, OnInit } from '@angular/core';
import { Object } from "../../object.model";
import { BucketService } from "../../../core/bucket.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { BmsQueryEncoder } from './../../../core/bms-query-encoder'

@Component({
  selector: 'bms-objects-list',
  templateUrl: './objects-list.component.html',
  styleUrls: ['./objects-list.component.css']
})
export class ObjectsListComponent implements OnInit {

  @Input() objects: any;
  @Input() searchValue: string;

  readonly bucketObjectsLabel = 'bucketObjects';
  readonly nextPageTokenLabel = 'nextPageToken';

  public bucketName = "";
  public prefix: string;

  public isExecutingMore: boolean;
  public isExecutedMoreOnce: boolean;

  private pathParamsReaderSubscription: Subscription;
  private queryParamsReaderSubscription: Subscription;
  private folderClickSubscription: Subscription;

  constructor(private route: ActivatedRoute, private bucketService: BucketService) { }

  ngOnInit() {
    this.pathParamsReaderSubscription = this.route.params.subscribe((params) => this.bucketName = params['name']);
    this.queryParamsReaderSubscription = this.route.queryParams.subscribe((queryParams) => this.prefix = queryParams['prefix'] || '');
    this.folderClickSubscription = this.bucketService.folderWasClicked.subscribe((folderWasClicked) => this.isExecutedMoreOnce = false);
    this.isExecutingMore = false;
    this.isExecutedMoreOnce = false;
  }

  fetchMoreData() {
    this.isExecutingMore = true;
    this.isExecutedMoreOnce = true;
    this.getNextPage(this.objects[this.nextPageTokenLabel]);
  }

  resetData() {
    this.isExecutedMoreOnce = false;
    this.bucketService
      .fetchObjects(this.bucketName, this.prefix)
      .subscribe((object: Object) => {
        this.objects[this.bucketObjectsLabel] = object[this.bucketObjectsLabel];
        this.objects[this.nextPageTokenLabel] = object[this.nextPageTokenLabel];
      });
  }

  private getNextPage(token: string) {
    this.bucketService
      .fetchObjects(this.bucketName, this.prefix, this.searchValue.length !== 0, token)
      .subscribe((object: Object) => {
        this.objects[this.bucketObjectsLabel] = this.objects[this.bucketObjectsLabel].concat(object[this.bucketObjectsLabel]);
        this.objects[this.nextPageTokenLabel] = object[this.nextPageTokenLabel];
        this.isExecutingMore = false;
      });
  }

  ngOnDestroy() {
    this.pathParamsReaderSubscription.unsubscribe();
    this.queryParamsReaderSubscription.unsubscribe();
  }

}
