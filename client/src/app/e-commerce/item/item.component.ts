import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { BasketService } from '../../services/basket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public items: Item[];
  public selectItem: Item;

  constructor(
    private itemService: ItemService,
    private basketService: BasketService,
    private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    const queryParam = this.activatedroute.snapshot.queryParams['id'];
    
    this.itemService.getItemById(queryParam).subscribe(item => {
      this.selectItem = item[0];
    });
  }

  addItem(item: Item){
    const userId = Number(localStorage.getItem('userId'));
    this.basketService.getBasketByUserId(userId).subscribe(basket => {
      this.basketService.saveBasketItem(basket[0].id, item).subscribe(item => {
      });
    })
  }
}
