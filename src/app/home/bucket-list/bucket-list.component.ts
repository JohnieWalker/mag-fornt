import {Component, OnDestroy, OnInit} from '@angular/core';
import {BucketService} from "../../core/bucket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'bms-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit, OnDestroy {

  public buckets: string[] = [];
  public bucketsFilterValue: string = "";

  private bucketsChangedSubscription: Subscription;
  private bucketsFilterValueChangedSubscription: Subscription;

  constructor(private bucketService: BucketService) {
  }

  ngOnInit() {
    this.bucketsChangedSubscription = this.bucketService.bucketsChanged.subscribe((buckets) => this.buckets = buckets);
    this.bucketsFilterValueChangedSubscription = this.bucketService.filterValueChanged.subscribe((filterValue) => this.bucketsFilterValue = filterValue);
  }

  ngOnDestroy() {
    this.bucketsChangedSubscription.unsubscribe();
    this.bucketsFilterValueChangedSubscription.unsubscribe();
  }

}
