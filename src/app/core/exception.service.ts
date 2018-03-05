import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ExceptionService {

  constructor() {
  }

  public handleException(exception: any) {

    return Observable.throw(exception);
  }

}
