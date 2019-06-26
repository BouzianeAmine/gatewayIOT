import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment.prod';
import {opcItems, OpcItem} from './itemsType';

@Injectable({
  providedIn: 'root'
})


export class ItemsService {
  public itemsIds = new Subject<any>();
  public items = new Subject<any>();
  private adreServer: string;

  constructor(private http: HttpClient) {}

 fixAdress(adress: string) {
    this.adreServer = adress;
    console.log('------Adressed fixed------');
    console.log(this.adreServer);
 }

 fetchItems() {
    setTimeout(() => {
      this.items.next();
    }, 1000);
    this.http.get<opcItems>(this.adreServer + environment.items, {headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((el: opcItems ) => {
     // tslint:disable-next-line:prefer-for-of
     for (let index = 0; index < el.browseResults.length; index++) {
       this.itemsIds.next(el.browseResults[index].id);
       this.fetchReadItem(el.browseResults[index].id);
     }
    });
  }

  fetchReadItem(id: string) {
    this.items.next();
    this.http.get(this.adreServer + environment.itemRead + this.fixidsWhiteSpace(id), { headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((item: { readResults: Array<OpcItem> }) => {
      this.items.next(item.readResults);
    });
  }

  getItemsId(): Observable<opcItems[]> {
    return this.itemsIds.asObservable();
  }

  fixidsWhiteSpace(id: string) {
    return id.replace(/ /g, '%20');
  }

  getItems() {
    return this.items.asObservable();
  }
}
