import { Component} from '@angular/core';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ItemWrite, Item } from './opcclient/itemsType';
import { MatDialog } from '@angular/material/dialog';
import { ItemsService } from './opcclient/items.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Iot Gateway';
  server = '';
  serveFix = false;
  items = new Array<Item>();
  fetching : boolean;
  v: any;

  constructor(private service: ItemsService,public dialog: MatDialog) { }

  getTheThing() {
    this.service.fixAdress(this.server);
    this.serveFix = true;
    this.server = '';
    this.getItems();
  }

  public getItems() {
    this.fetching = true;
    this.items = new Array<Item>();
    this.service.fetchItems((items: Array<Item>) => {
      this.items = items;
    });
  }

  public isServerFixed(): boolean {
    return this.serveFix;
  }

  public setName(name:string): string{
    return name.split('.')[name.split('.').length-1];
  }

  public reset(): void {
    this.fetching = !this.fetching;
    this.serveFix = !this.serveFix;
    this.service.fixAdress('');
  }

  openDialog(item: Item): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '250px',
      data: {id: item.id, v: item.v}
    });
    dialogRef.afterClosed().subscribe((result:ItemWrite) => {
      // this setCommand is only for test, je pense j'aurais besoin de lancer l'application en mode admin pour que sa marche.
      this.service.sendCommand(result);
    });
  }


}
