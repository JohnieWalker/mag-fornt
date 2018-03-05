import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {

  private _apiBaseUrl: string;
  private _loginPath: string;
  private _logoutPath: string;
  private _bucketsPath: string;
  private _objectsPath: string;
  private _uploadFilePath: string;
  private _objectVersionsPath: string;
  private _adminPath: string;
  private _createBucketPath: string;
  private _createSitePath: string;
  private _authoritiesPath: string;
  private _bucketsRepoPath: string;
  private _makeBucketPublicPostfix: string;
  private _bucketsRepoPublishPath: string;
  private _groups: string;


  constructor() {
    this._apiBaseUrl = environment.apiUrl;

    this._loginPath = '/bms/api/v1/auth/login';
    this._logoutPath = '/bms/api/v1/auth/logout';
    this._adminPath = '/bms/api/v1/auth/admin';
    this._bucketsPath = '/bms/api/v1/auth/buckets';
    this._objectsPath = '/bms/api/v1/objects';
    this._uploadFilePath = '/bms/api/v1/objects';
    this._objectVersionsPath = '/bms/api/v1/objects/versions';
    this._createBucketPath = '/bms/api/v1/buckets';
    this._createSitePath = '/bms/api/v1/buckets/website';
    this._authoritiesPath = '/bms/api/v1/auth/authorities';
    this._bucketsRepoPath = '/bms/api/v1/repo/buckets';
    this._bucketsRepoPublishPath = '/bms/api/v1/buckets';
    this._makeBucketPublicPostfix = '/policy/public';
    this._groups = '/bms/api/v1/repo/groups';

  }

  get loginUrl() {
    return this._apiBaseUrl + this._loginPath;
  }

  get logoutUrl() {
    return this._apiBaseUrl + this._logoutPath;
  }

  get bucketsUrl() {
    return this._apiBaseUrl + this._bucketsPath;
  }

  get objectsUrl() {
    return this._apiBaseUrl + this._objectsPath;
  }

  get uploadFileUrl() {
    return this._apiBaseUrl + this._uploadFilePath;
  }

  get objectVersionsUrl() {
    return this._apiBaseUrl + this._objectVersionsPath;
  }

  get adminUrl() {
    return this._apiBaseUrl + this._adminPath;
  }

  get createBucketUrl() {
    return this._apiBaseUrl + this._createBucketPath;
  }

  get createSiteUrl() {
    return this._apiBaseUrl + this._createSitePath;
  }

  get authoritiesUrl() {
    return this._apiBaseUrl + this._authoritiesPath;
  }

  get bucketsRepoUrl() {
    return this._apiBaseUrl + this._bucketsRepoPath;
  }

  get bucketsRepoPublishUrl() {
    return this._apiBaseUrl + this._bucketsRepoPublishPath;
  }

  get publishBucketPostfixUrl() {
    return this._makeBucketPublicPostfix;
  }

  get groupUrl() {
    return this._apiBaseUrl + this._groups;
  }

}
