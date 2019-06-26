import { Component } from '@angular/core';
import {ItemsService} from './opcclient/items.service';
import {opcItems, OpcItem} from './opcclient/itemsType';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Iot Gateway';
  server = '';
  serveFix = false;
  fetching = false;
  private items: Array<OpcItem> = [];
  constructor(private service: ItemsService) {
  }

  getTheThing() {
    this.service.fixAdress(this.server);
    this.serveFix = true;
    this.server = '';
  }

  public getItemsId() {
    this.service.getItemsId().subscribe(item => {
        console.log(item);
    });
  }
  /*public getItembyId(id: string) {
    this.service.fetchReadItem(id).subscribe((item: opcItem ) => {
      console.log(item.readResults);
    });
  }*/

  public getItems() {
    this.fetching = true;
    this.service.fetchItems();
    this.service.getItems().subscribe((item: OpcItem ) => {
      this.items.push(item);
      console.log(item);
    });
    /*this.items.filter(item => item = undefined).forEach(item => {
      console.log(item);
    });*/
    return this.items;
  }

}
