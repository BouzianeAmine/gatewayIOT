import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../environments/environment.prod';
import {opcItems,opcItem} from './itemsType';

@Injectable({
  providedIn: 'root'
})


export class ItemsService {
  public itemsIds = new Subject<any>();
  public items=new Subject<any>();
  private adreServer:String;
  constructor(private http:HttpClient) {}

 fixAdress(adress:String){
    this.adreServer=adress;
    console.log("------Adressed fixed------");
    console.log(this.adreServer);
    this.fetchItems();
 }

 fetchItems():Observable<opcItem[]>{
    this.http.get<opcItems>(this.adreServer+environment.items,{headers: {
      "Content-Type": 'text/json; charset=utf-8'
    }}).subscribe((el) => {
      el.browseResults.forEach(id=>{
        this.itemsIds.next(id);
        this.fetchReadItem(this.fixidsWhiteSpace(id));
      });
    });
    return this.items.asObservable();
  }

  fetchReadItem(id:String):Observable<opcItem>{
    this.items.next();
    this.http.get(this.adreServer+environment.itemRead+id,{headers: {
      "Content-Type": 'text/json; charset=utf-8'
    }}).subscribe((item:opcItem)=>{
      this.items.next(item.readResults);
    });
    return this.items.asObservable();
  }

  getItemsId(): Observable<opcItems> {
    return this.itemsIds.asObservable();
  }

  fixidsWhiteSpace(id:String){
    return id.replace(/ /g, "%20");
  }
}
