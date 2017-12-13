import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PhotoServiceService {

  constructor(private http: Http) {
  }

  uploadPhoto(formdata: FormData) {
    const headers = new Headers({
      'content': 'FormData'});
    return this.http.post('http://localhost:3000/upload', formdata, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
