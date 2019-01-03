import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  private items:  Array<object> = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.getItems();
  }

  private getItems() {
    this.apiService.get('/api/items').subscribe((data:  Array<object>) => {
        this.items = data;
    });
  }

  private deleteItem(item, index: number) {

    var body = { id: item.id };
    
    this.apiService.delete('/api/items', body).subscribe((data:  any) => {
      const rowIndex = this.items.indexOf(item, 0);
      if (rowIndex > -1) {
         this.items.splice(index, 1);
      }
    });
  }

}
