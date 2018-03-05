import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { BucketService } from '../../../core/bucket.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'bms-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() bucketName: string;
  public uploadForm: FormGroup;
  public uploader: FileUploader;

  public isErrorAction = false;

  public bucketIsNotExistsSubscription: Subscription;

  constructor(private apiService: ApiService, private bucketService: BucketService, private formBuilder: FormBuilder, private zone: NgZone) {
  }

  ngOnInit() {
    this.initForm();
    this.uploader = new FileUploader({
      url: `${this.apiService.uploadFileUrl}?bucketName=${this.bucketName}`,
      isHTML5: true,
      maxFileSize: 104857600
    });

    this.uploader.onCompleteItem = () => {
      this.bucketService.fetchObjects(this.bucketName).subscribe((data) => {
        this.bucketService.objectsListChanged.emit(data);
      });
    };

    this.bucketService.bucketIsNotExists.subscribe(
      (errorMessage: string) => this.isErrorAction = true
    );

  }

  private initForm() {
    this.uploadForm = this.formBuilder.group({
      'fileToUpload': ''
    });
  }

  public upload(item: FileItem) {
    item.onProgress = (progress: number) => this.zone.run(() => item.progress = progress);
    item.upload();
  }

}
