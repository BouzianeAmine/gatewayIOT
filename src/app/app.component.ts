import { Component } from '@angular/core';
import {ItemsService} from './opcclient/items.service';
import {opcItems,opcItem} from './opcclient/itemsType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OPC CLIENT TEST';
  server="";
  constructor(private service: ItemsService) {
  }

  getTheThing(){
    this.service.fixAdress(this.server);
    
  }

  public getItemsId() {
      this.service.getItemsId().subscribe(item => {
          console.log(item);
      });
  }
  public getItembyId(){
    this.service.fetchReadItem('Simulation Examples.Functions.Ramp1').subscribe((item:opcItem)=>{
      console.log(item.readResults);
    })
  }

  public getItems(){
    this.service.fetchItems().subscribe(items=>{
      items.forEach(item=>{
        console.log(item)
      })
    })
  }
}
