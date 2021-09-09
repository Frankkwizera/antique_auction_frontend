import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Item } from 'src/app/shared/types';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {
  items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  allItems: Item[] = []
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.retrieveAllItems();
  }

  /**
   * Retrieves all stored items.
   */
  retrieveAllItems(): void {
    this._apiService.retrieveAllItems().subscribe(response => {
      this.allItems = response;
      console.log("<<<<<<< this.allItems: ", this.allItems)
    }, err => {
      alert(err.error.message)
    })
  }

}
