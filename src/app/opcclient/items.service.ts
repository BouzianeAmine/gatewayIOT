import { Injectable } from '@angular/core';
//import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment.prod';
import {IdsItems, Item, Items, ItemWrite, ResponseWriteCommand, ItemWriteResponse} from './itemsType';

@Injectable({
  providedIn: 'root'
})


export class ItemsService {
  private adreServer: string;
  private requete: string;
  constructor(private http: HttpClient) {}

 fixAdress(adress: string) {
    this.adreServer = adress;
    console.log('------Adressed fixed------');
    console.log(this.adreServer);
 }

 fetchItems(calling: Function) {
    this.requete = '';
    this.http.get<IdsItems>(this.adreServer + environment.items, {headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((el ) => {
        for (let index = 0; index < el.browseResults.length; index++) {
          if (index === el.browseResults.length - 1 ) {
            this.caseLastOne(el.browseResults[index].id);
          } else {
            this.anyOtherCase(el.browseResults[index].id);
          }
        }
        this.fetchReadItem(this.requete, calling);
     });
  }

  fetchReadItem(requete: string, back: Function) {
    this.http.get<Items>(this.adreServer + environment.itemRead + this.requete, { headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((items) => {
      if (items.readResults) {
        back(items.readResults);
        //repeat the call so we can have the update each second
        setTimeout( () => { this.fetchReadItem(this.requete, back); }, 1000);
      }
    });
  }

  /*fixidsWhiteSpace(id: string) {
    return id.replace(/ /g, '%20');
  }*/


  anyOtherCase(id: string ) {
    this.requete = this.requete.concat(id);
    this.requete = this.requete.concat( '&ids=' );
  }

  caseLastOne(id: string ) {
    this.requete = this.requete.concat(id);
  }

  sendCommand(item: ItemWrite) {
    this.http.post<ResponseWriteCommand>(this.adreServer + environment.itemWrite, [item], { headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((response) => {
      if (response.writeResults[0].s) {
        console.log('Done !!');
      }
    });
  }
}
