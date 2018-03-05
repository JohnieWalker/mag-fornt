import {Component, OnDestroy, OnInit} from '@angular/core';
import {BucketService} from "../core/bucket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'bms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public bucketsCount: number;

  private bucketsChangedSubscription: Subscription;

  constructor(private bucketService: BucketService) {
  }

  ngOnInit() {

    this.bucketService
      .fetchBuckets()
      .subscribe(
        data => this.bucketService.bucketsChanged.emit(data)
      );

    this.bucketsChangedSubscription = this.bucketService
      .bucketsChanged
      .subscribe(
        buckets => this.bucketsCount = buckets.length
      );
  }

  ngOnDestroy() {
    this.bucketsChangedSubscription.unsubscribe();
  }

}
