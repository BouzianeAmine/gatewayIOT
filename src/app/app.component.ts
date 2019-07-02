import { Component, OnInit } from '@angular/core';
import {ItemsService} from './opcclient/items.service';
import { Item, ItemWrite } from './opcclient/itemsType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'Iot Gateway';
  server = '';
  serveFix = false;
  items: Array<Item>;
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
    this.items = [];
    this.fetching = true;
    this.service.clearItems();
    this.service.getItems().subscribe((item: Item) => {
      if (item !== undefined) {
        this.items.push(item);
      }
    });
    return this.items;
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
