import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

import { BucketService } from '../../../core/bucket.service';

@Component({
  selector: 'bms-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.css']
})
export class ObjectSearchComponent implements OnInit {

  @Input() bucketName: string;
  @Input() prefix: string;
  @Output() objectValueChanged = new EventEmitter<string>();
  public isObjectSearchActive = true;
  public objectSearchForm: FormGroup;

  public resetSearchParams: Subscription;

  constructor(private formBuilder: FormBuilder, private bucketService: BucketService) {
  }

  ngOnInit() {
    this.initForm();

    this.objectSearchForm.get('objectName').valueChanges.debounceTime(500).subscribe((objectName) => {
      this.objectValueChanged.emit(objectName);
    });

    this.resetSearchParams = this.bucketService.folderWasClicked.subscribe(() => {
      this.objectSearchForm.controls['objectName'].setValue('');
    });
    
  }

  private initForm() {
    this.objectSearchForm = this.formBuilder.group({
      'objectName': ''
    });
  }

  public activateObjectSearch() {
    this.isObjectSearchActive = true;
  }

  public deactivateObjectSearch() {
    if (!this.objectSearchForm.value.objectName) {
      this.isObjectSearchActive = false;
    }
  }

  ngOnDestroy() {
    this.resetSearchParams.unsubscribe();
  }

}
