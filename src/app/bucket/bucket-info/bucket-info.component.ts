import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { BucketService } from "../../core/bucket.service";
import { Object } from "../object.model";

@Component({
  selector: 'bms-bucket-info',
  templateUrl: './bucket-info.component.html',
  styleUrls: ['./bucket-info.component.css']
})
export class BucketInfoComponent implements OnInit, OnDestroy {

  public bucketName: string;
  public objects: Object[];
  public prefix: string;
  public searchValue: string = '';

  public isObjectsEmpty = false;
  public isBucketExists = true;

  private pathParamsReaderSubscription: Subscription;
  private queryParamsReaderSubscription: Subscription;
  private objectsListChangedSubscription: Subscription;
  private objectsFetchingSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bucketService: BucketService) {

    this.bucketName = "";
    this.objects = [];
  }

  ngOnInit() {
    this.pathParamsReaderSubscription = this.route.params.subscribe((params) => this.bucketName = params['name']);
    this.queryParamsReaderSubscription = this.route.queryParams.subscribe((queryParams) => this.prefix = queryParams['prefix'] || '');

    this.objectsListChangedSubscription = this.bucketService.objectsListChanged.subscribe(
      (objects: Object[]) => {
        this.searchValue = '';
        this.objects = objects;
      }
    );

    this.objectsFetchingSubscription = this.bucketService
      .fetchObjects(this.bucketName, this.prefix)
      .subscribe(
      (objects: Object[]) => this.bucketService.objectsListChanged.emit(objects),
      (error: Error) => {
        this.bucketService.bucketIsNotExists.emit();
        this.isBucketExists = false;
      }
      );
  }

  ngOnDestroy() {
    this.pathParamsReaderSubscription.unsubscribe();
    this.objectsListChangedSubscription.unsubscribe();
    this.objectsFetchingSubscription.unsubscribe();
    this.isBucketExists = true;
  }

  onObjectSearchValueChanged(value) {
    this.isObjectsEmpty = false;
    this.searchValue = value;
    this.bucketService
      .fetchObjects(this.bucketName, this.prefix + value, this.searchValue.length !== 0)
      .subscribe((objects: Object[]) => {
        this.objects = objects;

        if (objects['bucketObjects'].length === 0) {
          this.isObjectsEmpty = true;
        }

      });
  }

}
