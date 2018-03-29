import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { UserProvider } from '../user/user';
/*
  Generated class for the PresentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PresentationProvider {
  data: any;
  cnt: number;
  constructor(public userData: UserProvider, public http: Http) {
    this.cnt = 0;
  }

  get(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.load();
    }
  }
  load(): any {
    return this.http.get('http://gyromouse.net/weboldal/konferenciapi/timetable.php')
      .map(this.processData, this);
  }
  processData(data: any) {
    this.data = {};
    let datatmp = data.json();
    datatmp.forEach(element => {
      this.data[element["room"]] = element["programs"];
    });
    return this.data;
  }

  filterPresentation(segment: string) {
    return this.get().map((data: any) => {
      if (segment === 'favorite') {
        return Object.keys(data).reduce((accumulator, currentValue) => {
          return accumulator.concat(data[currentValue]);
        }, [])
          .filter((el) => {
            return this.userData.isFavorite(el.id);
          }, this);
      }
      else {
        return data[segment];
      }
    });
  }
  sendQuestion(question: string) {
    const url = `http://gyromouse.net/weboldal/konferenciapi/question.php?pid=${this.cnt}&name=${this.userData.username}&question=${question}`;
    this.cnt += 1;
    return this.http.get(url);
  }
}
