import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Basket } from '../../models/basket';
import { BasketService } from '../../services/basket.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public userBasket = new Basket();
  public userId: number;
  public totalCost = 0;

  constructor(
    private basketService: BasketService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));

    this.basketService.getBasketByUserId(this.userId).subscribe(basket => {
      this.basketService.getBasketItems(basket[0].id).subscribe(items => {
        this.userBasket = basket[0];
        this.userBasket.items = items;
        this.calculateTotalCost();
      })
    })
  }

  calculateTotalCost(){
    this.userBasket.items.forEach(item => {
      this.totalCost += item.price
    })

    this.totalCost = Math.round(this.totalCost*100)/100;
  }

  validateBasket(basket: Basket) {
    const order = new Order(this.userId, basket.items, this.totalCost);

    this.orderService.saveOrder(order).subscribe(order => {
      if (order)
      this.orderService.saveOrderItems(order).subscribe(result => {
        if(result)
        this.basketService.deleteBasketItems(basket.id).subscribe()
      })
    })

    this.userBasket.items = [];
    // this.router.navigate(["/user"], { state: { isPasswordExpired: true } });
  }
}
