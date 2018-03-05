import { Component, Input, OnInit } from '@angular/core';
import { Object } from '../../object.model';
import { BucketService } from '../../../core/bucket.service';
import { Router } from '@angular/router';
import { ObjectWithVersions } from '../../object-with-versions.model';

@Component({
  selector: 'bms-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  @Input() object: Object;
  @Input() searchValue: string;
  public objectVersions: ObjectWithVersions[];
  public isVersionActive = false;

  constructor(private bucketService: BucketService, private router: Router) {
  }

  ngOnInit() {
  }

  public getObjects(prefix: string) {
    this.bucketService
      .fetchObjects(this.object.s3ObjectSummary.bucketName, prefix)
      .subscribe((objects) => {
        this.bucketService.objectsListChanged.emit(objects);
        this.router.navigate(['/bucket', this.object.s3ObjectSummary.bucketName], { queryParams: { prefix: prefix } });
      });
  }

  public getObjectHistory(objectKey: string) {

    if (this.isVersionActive) {
      return;
    }

    this.bucketService
      .fetchObjectHistory(this.object.s3ObjectSummary.bucketName, objectKey)
      .subscribe(versions => this.objectVersions = this.normalizeVersionsLinks(versions));
  }

  public toggleVersionsList() {
    this.isVersionActive = !this.isVersionActive;
  }

  public isFolder(object: Object) {
    return object.s3ObjectSummary.size === 0 && object.s3ObjectSummary.key.endsWith('/');
  }

  clickOnFolder() {
    this.bucketService.folderWasClicked.emit();
  }

  normalizeVersionsLinks(objectVersions: ObjectWithVersions[]) {
    objectVersions.forEach(element => {
      if (!element.s3ObjectSummary.latest) {
        element.downloadLink = element.downloadLink + '?versionId=' + element.s3ObjectSummary.versionId;
      }
    });

    return objectVersions;
  }

}
