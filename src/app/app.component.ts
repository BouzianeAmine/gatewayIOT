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

  public getItemsId() {
    this.service.getItemsId().subscribe(item => {
        console.log(item);
    });
  }


  public getItems() {
    this.fetching = true;
    this.service.fetchItems((item: Item) => {
      this.items.push(item);
      // this.item = item;
      // this.items = [];
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
