import { Component, OnInit } from '@angular/core';
import {ItemsService} from './opcclient/items.service';
import { Item, ItemWrite } from './opcclient/itemsType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  item: Item ;
  title = 'Iot Gateway';
  server = '';
  serveFix = false;
  items = new Array<Item>();
  fetching: boolean;

  constructor(private service: ItemsService) { }

  getTheThing() {
    this.service.fixAdress(this.server);
    this.serveFix = true;
    this.server = '';
  }

  public getItems() {
    this.fetching = true;
    this.items=new Array<Item>();
    this.service.fetchItems((items: Array<Item>) => {
      this.items=items;
    });
  }

  public isServerFixed(): boolean {
    return this.serveFix;
  }

  sendCommand(id: string) {
    const v = 5;
    const data: ItemWrite = {id , v };
    this.service.sendCommand(data);
  }
}
