import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment.prod';
import {IdsItems, Item, Items, ItemWrite, ResponseWriteCommand, ItemWriteResponse} from './itemsType';

@Injectable({
  providedIn: 'root'
})


export class ItemsService {
  public itemsIds = new Subject<any>();
  public items = new Subject<Item>();
  private adreServer: string;
  private requete: string;
  constructor(private http: HttpClient) {}

 fixAdress(adress: string) {
    this.adreServer = adress;
    console.log('------Adressed fixed------');
    console.log(this.adreServer);
 }

 // tslint:disable-next-line:ban-types
 fetchItems(calling: Function) {
    this.requete = '';
    this.http.get<IdsItems>(this.adreServer + environment.items, {headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((el ) => {
        for (let index = 0; index < el.browseResults.length; index++) {
          this.itemsIds.next(el.browseResults[index].id);
          if (index === el.browseResults.length - 1 ) {
            this.caseLastOne(el.browseResults[index].id);
          } else {
            this.anyOtherCase(el.browseResults[index].id);
          }
        }
        this.fetchReadItem(this.requete, calling);
     });
  }

  // tslint:disable-next-line:ban-types async with callbacks
  fetchReadItem(requete: string, back: Function) {
    this.items = new Subject<Item>();
    this.http.get<Items>(this.adreServer + environment.itemRead + this.requete, { headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((items) => {
      if (items.readResults) {
        items.readResults.forEach((item: Item) => {
          // this.items.next(item);
          back(item);
        });
        setTimeout( () => { this.fetchReadItem(this.requete, back); }, 1000);
      }
    });
  }

  getItemsId(): Observable<IdsItems> {
    return this.itemsIds.asObservable();
  }

  fixidsWhiteSpace(id: string) {
    return id.replace(/ /g, '%20');
  }

  /*getItems(): Observable<Item> {
    this.fetchItems();
    return this.items.asObservable();
  }*/

  anyOtherCase(id: string ) {
    this.requete = this.requete.concat(id);
    this.requete = this.requete.concat( '&ids=' );
  }

  caseLastOne(id: string ) {
    this.requete = this.requete.concat(id);
  }

  clearItems() {
    this.items.next();
  }

  sendCommand(item: ItemWrite) {
    this.http.post<ItemWriteResponse>(this.adreServer + environment.itemWrite, [item], { headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((response) => {
      if (response.s) {
        console.log('Done !!');
      }
    });
  }
}
