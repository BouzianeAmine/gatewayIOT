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
  public barChartData = [];
  public barChartLabels;
  fetching: boolean;

  //Chart conf
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'line';
  public barChartLegend = true;

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
    this.items=new Array<Item>();
    this.service.fetchItems((items: Array<Item>) => {
      this.items=items;
    });
  }

    createChart(items: Array <Item>) {
      items.forEach( (item: Item ) => {
        this.barChartLabels = [Date.now().toString()];
        this.barChartData = [
          {data: [item.v], label: item.id}
        ];
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
