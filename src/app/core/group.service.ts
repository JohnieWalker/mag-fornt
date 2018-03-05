import { EventEmitter, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

import { Group } from './../admin/db-management/manage-groups/group.model';

@Injectable()
export class GroupService {

  public groupWasClicked = new EventEmitter<any>();
  public groupWasChanged = new EventEmitter<Object>();
  public groupWasCreated = new EventEmitter<Object>();
  public groupWasDeleted = new EventEmitter();
  public groupDeleteError = new EventEmitter<any>();

  constructor(private http: Http, private apiService: ApiService) {
  }

  getGroups() {

    const options = new RequestOptions({ withCredentials: true });

    return this.http.get(this.apiService.groupUrl, options)
      .map((response) => response.json())
      .timeout(5000)
      .catch((error) => Observable.throw(error.json()));
  }

  createGroup(name: string, buckets: string[]) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ withCredentials: true, headers: headers });

    return this.http
      .post(this.apiService.groupUrl, { buckets, name }, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  updateGroup(name: string, buckets: string[]) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ withCredentials: true, headers: headers });

    return this.http
      .post(this.apiService.groupUrl + '/' + name, { buckets, name }, options)
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

  deleteGroup(name: string, buckets: string[]) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .delete(this.apiService.groupUrl, new RequestOptions({
        withCredentials: true,
        body: { buckets, name },
        headers: headers
      }))
      .map(response => response.json())
      .timeout(5000)
      .catch(error => Observable.throw(error.json()));
  }

}
