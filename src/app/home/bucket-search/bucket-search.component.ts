import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BucketService} from "../../core/bucket.service";

@Component({
  selector: 'bms-bucket-search',
  templateUrl: './bucket-search.component.html',
  styleUrls: ['./bucket-search.component.css']
})
export class BucketSearchComponent implements OnInit {

  public isBucketFormActive: boolean = true;
  public bucketSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bucketService: BucketService) {
  }

  ngOnInit() {
    this.initForm();

    this.bucketSearchForm.get('bucketName').valueChanges.subscribe((filterValue) => this.bucketService.filterValueChanged.emit(filterValue));
  }

  private initForm(): void {
    this.bucketSearchForm = this.formBuilder.group({
      'bucketName': ""
    });
  }

  public activateBucketForm() {
    this.isBucketFormActive = true;
  }

  public deactivateBucketForm() {
    if (!this.bucketSearchForm.value.bucketName) {
      this.isBucketFormActive = false;
    }
  }
}
