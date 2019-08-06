import { Injectable } from '@angular/core';
import { skipLast,last } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment.prod';
import {IdsItems, Items, ItemWrite, ResponseWriteCommand, ItemWriteResponse} from './itemsType';

@Injectable({
  providedIn: 'root'
})


export class ItemsService {
  private adreServer: string;
  private requete: string;
  constructor(private http: HttpClient) {}

 fixAdress(adress: string) {
    this.adreServer = adress;
 }

 fetchItems(calling: Function) {
    this.requete = '';
    this.http.get<IdsItems>(this.adreServer + environment.items, {headers: {
      'Content-Type': 'text/json; charset=utf-8'
    }}).subscribe((el ) => {
        from(el.browseResults).pipe(skipLast(1)).subscribe(element=>this.castAnyOtherCase(element.id));
        from(el.browseResults).pipe(last()).subscribe((lastElement)=>this.caseLastOne(lastElement.id));
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
      }else throw new Error("No elements hapen to be read, check your server adresse");
    });
  }

  castAnyOtherCase(id: string ) {
    this.requete = this.requete.concat(id);
    this.requete = this.requete.concat( '&ids=' );
  }

  caseLastOne(id: string ) {
    this.requete = this.requete.concat(id);
  }

  sendCommand(item: ItemWrite) {
    this.http.post<ResponseWriteCommand>(this.adreServer + environment.itemWrite, [item]).subscribe((response) => {
      if (response.writeResults[0].s == true) {
        console.log('Done !!');
      }
    });
  }
}
