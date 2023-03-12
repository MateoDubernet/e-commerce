import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public items: Item[];

  constructor(
    private itemService: ItemService,
    private basketService: BasketService,
    private router: Router) { }

  ngOnInit(): void {
    this.itemService.getItem().subscribe(item => {
      this.items = item;
    })
  }

  addItem(item: Item){
    const userId = Number(localStorage.getItem('userId'));
    this.basketService.getBasketByUserId(userId).subscribe(basket => {
      this.basketService.saveBasketItem(basket[0].id, item).subscribe(item => {
      });
    })
  }

  viewItem(item: Item){
    this.router.navigate(["/item"], { queryParams: { id: item.id} });
  }
}
