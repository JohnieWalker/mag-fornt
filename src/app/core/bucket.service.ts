import { EventEmitter, Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers, QueryEncoder } from '@angular/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Object } from '../bucket/object.model';
import { BucketWithAccountId } from '../admin/db-management/manage-buckets/bucket-with-accountid.model';
import { BmsQueryEncoder } from './../core/bms-query-encoder';

@Injectable()
export class BucketService {

  public bucketsChanged = new EventEmitter<string[]>();
  public filterValueChanged = new EventEmitter<string>();
  public objectsListChanged = new EventEmitter<Object[]>();
  public folderWasClicked = new EventEmitter<Object[]>();
  public bucketIsNotExists = new EventEmitter<any>();

  constructor(private http: Http, private apiService: ApiService) {
  }

  public fetchBuckets() {

    return this.http
      .get(this.apiService.bucketsUrl, { withCredentials: true })
      .map((response) => response.json())
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  public fetchObjects(bucketName: string, prefix?: string, searchNested?: boolean, token?: string) {

    const params = new URLSearchParams('', new BmsQueryEncoder());

    params.set('bucketName', bucketName);
    params.set('prefix', prefix);
    params.set('token', token);
    params.set('nested', searchNested ? searchNested.toString() : false.toString());

    return this.http
      .get(this.apiService.objectsUrl, { search: params, withCredentials: true })
      .map((response) => response.json())
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  public fetchPaginatedObjects(bucketName: string, prefix?: string, searchNested?: boolean) {

    const params = new URLSearchParams();

    params.set('bucketName', bucketName);
    params.set('prefix', prefix);
    params.set('nested', searchNested ? searchNested.toString() : false.toString());

    return this.http
      .get(this.apiService.objectsUrl, { search: params, withCredentials: true })
      .map((response) => response.json())
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  public fetchObjectHistory(bucketName: string, prefix: string) {

    const params = new URLSearchParams();

    params.set('bucketName', bucketName);
    params.set('prefix', prefix);

    return this.http
      .get(this.apiService.objectVersionsUrl, { search: params, withCredentials: true })
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  public paginateObjects(bucketName: string, prefix: string) {

    const params = new URLSearchParams();

    params.set('bucketName', bucketName);
    params.set('prefix', prefix);

    return this.http
      .get(this.apiService.objectVersionsUrl, { search: params, withCredentials: true })
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  public createBucket(bucketName: string, accountId: string) {

    let urlSearchParams = new URLSearchParams();
    let options = new RequestOptions({ withCredentials: true });

    urlSearchParams.append('bucketName', bucketName);
    urlSearchParams.append('accountId', accountId);

    return this.http
      .post(this.apiService.createBucketUrl, urlSearchParams, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()))
  }

  public createSite(bucketName: string, accountId: string, indexPage: string, errorPage: string) {

    const urlSearchParams = new URLSearchParams("", );
    const options = new RequestOptions({ withCredentials: true });

    urlSearchParams.append('bucketName', bucketName);
    urlSearchParams.append('accountId', accountId);
    urlSearchParams.append('indexPage', indexPage);
    urlSearchParams.append('errorPage', errorPage);

    return this.http
      .post(this.apiService.createSiteUrl, urlSearchParams, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()))
  }

  public fetchBucketsWithAccountIds() {

    return this.http
      .get(this.apiService.bucketsRepoUrl, { withCredentials: true })
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()))
  }

  public deleteBucketWithAccountId(bucketName: string, accountId: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .delete(this.apiService.bucketsRepoUrl, new RequestOptions({
        withCredentials: true,
        body: { name: bucketName, accountId },
        headers: headers
      }))
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  public createBucketWithAccountId(bucketName: string, accountId: string) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ withCredentials: true, headers: headers });

    return this.http
      .post(this.apiService.bucketsRepoUrl, { name: bucketName, accountId }, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  public makeBucketPublic(bucketName: string) {
    const urlSearchParams = new URLSearchParams("", );
    const options = new RequestOptions({ withCredentials: true });

    urlSearchParams.append('bucketName', bucketName);

    return this.http
      .post(this.apiService.bucketsRepoPublishUrl + '/' + bucketName + this.apiService.publishBucketPostfixUrl, urlSearchParams, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()))
  }

}
